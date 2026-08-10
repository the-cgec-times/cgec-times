import os
import smtplib
import re
import urllib.request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google import genai
from dotenv import load_dotenv

# .env ফাইল থেকে সিক্রেট কী ও কনফিগারেশন লোড করা
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
SUBSCRIBER_SHEET_URL = os.getenv("SUBSCRIBER_SHEET_URL")

client = genai.Client(api_key=GEMINI_API_KEY)

def get_subscriber_emails():
    """Google Sheet-এর ওয়েব কনটেন্ট থেকে শুধু সঠিক ইমেইল আইডিগুলো ফিল্টার করে বাদ দেওয়া"""
    emails = []
    if not SUBSCRIBER_SHEET_URL:
        print("❌ .env ফাইলে SUBSCRIBER_SHEET_URL পাওয়া যায়নি!")
        return emails

    try:
        req = urllib.request.Request(SUBSCRIBER_SHEET_URL, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req)
        raw_content = response.read().decode('utf-8')
        
        # Regex ব্যবহার করে শুধু ভ্যালিড ইমেইলগুলোকে ফিল্টার করা
        email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        found_emails = re.findall(email_pattern, raw_content)
        
        # ডুপ্লিকেট ইমেইল বাদ দেওয়া এবং ফিল্টারিং
        for email in found_emails:
            clean_email = email.strip().lower()
            # গুগলের অভ্যন্তরীণ ফাইল সার্ভিস বা ফন্ট ইমেইল যাতে ভুলবশত না আসে
            if clean_email not in emails and not clean_email.endswith('.png') and not clean_email.endswith('.ttf'):
                emails.append(clean_email)
                    
        print(f"📊 Google Sheet থেকে মোট {len(emails)} জন সঠিক Subscriber পাওয়া গেছে।")
    except Exception as e:
        print(f"⚠️ Google Sheet থেকে ডাটা পড়তে সমস্যা হয়েছে: {e}")
        
    return emails

def generate_newsletter(raw_news_data):
    """Gemini API দিয়ে HTML নিউজলেটার তৈরি করা (ব্যর্থ হলে অটো-ফলব্যাক ব্যবহার হবে)"""
    prompt = f"""
    You are the editor of 'The CGEC Times'. 
    Create a clean, modern, and mobile-responsive HTML newsletter based on the raw news content provided below.
    Make it visually appealing for student readers using appropriate headings, bullet points, and clear spacing.
    Do not wrap the output in markdown code blocks like ```html. Return ONLY raw valid HTML code.

    Raw News Content:
    {raw_news_data}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash-lite',
            contents=prompt,
        )
        
        html_text = response.text
        if html_text.startswith("```html"):
            html_text = html_text.replace("```html", "", 1)
        if html_text.startswith("```"):
            html_text = html_text.replace("```", "", 1)
        if html_text.endswith("```"):
            html_text = html_text[:-3]
            
        print("✨ Gemini API দিয়ে নিউজলেটার তৈরি হয়েছে!")
        return html_text.strip()

    except Exception as e:
        print(f"⚠️ Gemini API Quota Note: {e}")
        print("🔄 অটোমেটিক ব্যাকআপ (Fallback) নিউজলেটার টেমপ্লেট ব্যবহার করা হচ্ছে...")
        
        fallback_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; padding: 20px; }}
                .container {{ max-width: 600px; background: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: auto; }}
                h1 {{ color: #003366; border-bottom: 2px solid #003366; padding-bottom: 10px; margin-top: 0; }}
                .news-card {{ background: #f8f9fa; border-left: 4px solid #003366; padding: 12px; margin: 15px 0; border-radius: 4px; }}
                .footer {{ font-size: 12px; color: #777777; text-align: center; margin-top: 25px; border-top: 1px solid #ddd; padding-top: 10px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🎓 The CGEC Times</h1>
                <p><em>Official Weekly Campus Digest</em></p>
                
                <div class="news-card">
                    <h3 style="margin-top:0;">🎉 CGEC Tech Fest 2026</h3>
                    <p>The annual tech fest dates have been announced for next month! Get ready for exciting competitions.</p>
                </div>

                <div class="news-card">
                    <h3 style="margin-top:0;">💻 AI & ML Workshop</h3>
                    <p>CSE Department is organizing a 3-day hands-on workshop on Machine Learning.</p>
                </div>

                <div class="news-card">
                    <h3 style="margin-top:0;">💼 Placement Drive 2026</h3>
                    <p>Campus recruitment drive has officially started for final year students.</p>
                </div>

                <div class="footer">
                    <p>© 2026 The CGEC Times | Cooch Behar Government Engineering College</p>
                </div>
            </div>
        </body>
        </html>
        """
        return fallback_html

def send_bulk_emails(receiver_list, subject, html_content):
    """Google Sheet-এর সব Subscriber-দের কাছে ইমেল পাঠানো"""
    if not receiver_list:
        print("❌ ইমেল পাঠানোর মতো কোনো Subscriber পাওয়া যায়নি।")
        return

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_EMAIL, GMAIL_APP_PASSWORD)
            
            for index, email in enumerate(receiver_list, start=1):
                try:
                    msg = MIMEMultipart("alternative")
                    msg["Subject"] = subject
                    msg["From"] = SENDER_EMAIL
                    msg["To"] = email
                    msg.attach(MIMEText(html_content, "html"))

                    server.sendmail(SENDER_EMAIL, email, msg.as_string())
                    print(f"[{index}/{len(receiver_list)}] ✅ ইমেল সফলভাবে গেছে: {email}")
                except Exception as e:
                    print(f"[{index}/{len(receiver_list)}] ❌ {email}-এ পাঠাতে ব্যর্থ: {e}")
                    
    except Exception as e:
        print(f"❌ Gmail SMTP কানেকশন ব্যর্থ হয়েছে: {e}")

if __name__ == "__main__":
    sample_news = """
    1. CGEC Tech Fest 2026 dates announced for next month!
    2. CSE Department is organizing a 3-day AI & Machine Learning Workshop.
    3. Campus recruitment drive started for final year CSE, ECE, and EE students.
    """
    
    print("📥 Google Sheet থেকে Subscriber লিস্ট পড়া হচ্ছে...")
    subscribers = get_subscriber_emails()
    
    if subscribers:
        print("⏳ নিউজলেটার তৈরি করা হচ্ছে...")
        newsletter_html = generate_newsletter(sample_news)
        
        print("✉️ সব Subscriber-দের কাছে ইমেল পাঠানো হচ্ছে...")
        send_bulk_emails(subscribers, "The CGEC Times - Weekly Digest", newsletter_html)
    else:
        print("❌ কোনো Subscriber ইমেল পাওয়া যায়নি। অনুগ্রহ করে .env ফাইলে SUBSCRIBER_SHEET_URL পরীক্ষা করুন।")