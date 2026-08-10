// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { supabase } from "../supabase";

// const EventDetailsPage = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const fetchEvent = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("events")
//           .select("*")
//           .eq("id", eventId)
//           .single();
//         if (error) throw error;
//         setEvent(data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvent();
//   }, [eventId]);

//   if (loading) return <div className="text-center" style={{marginTop: "200px"}}>Loading...</div>;
//   if (!event) return <div className="text-center" style={{marginTop: "200px"}}>Event Not Found!</div>;

//   return (
//     <div className="container" style={{ marginTop: "150px", marginBottom: "80px" }}>
//       <button onClick={() => navigate(-1)} className="btn btn-outline-dark mb-4">Back</button>
      
//       <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
//         {/* IMAGE TAG - Direct URL Use kora hoyeche */}
//         <div style={{ background: '#f0f0f0', minHeight: '300px' }}>
//           {event.image ? (
//             <img
//               src={event.image} 
//               className="card-img-top"
//               alt={event.name}
//               style={{ width: "100%", maxHeight: "500px", objectFit: "cover", display: 'block' }}
//               onError={(e) => {
//                 console.log("Image failed to load:", event.image);
//                 e.target.src = "https://via.placeholder.com/800x450?text=Invalid+Image+URL";
//               }}
//             />
//           ) : (
//             <div className="text-center py-5">No Image URL Found in Database</div>
//           )}
//         </div>

//         <div className="card-body p-4 p-md-5">
//           <h1 className="fw-bold">{event.name}</h1>
//           <p className="text-muted">{event.date} | {event.venue}</p>
//           <hr />
//           <h4 className="fw-bold">Description</h4>
//           <p className="text-secondary" style={{ whiteSpace: "pre-line" }}>{event.description}</p>
          
//           {event.fullDetails && (
//             <div className="mt-4">
//               <h4 className="fw-bold">Details</h4>
//               <p style={{ whiteSpace: "pre-line" }}>{event.fullDetails}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetailsPage;






































import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase.from("events").select("*").eq("id", eventId).single();
        if (error) throw error;
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <div className="text-center" style={{marginTop: "200px"}}>Loading...</div>;
  if (!event) return <div className="text-center" style={{marginTop: "200px"}}>Event Not Found!</div>;

  return (
    <div className="container" style={{ marginTop: "150px", marginBottom: "80px" }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline-dark mb-4">← Back</button>
      
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className={`p-2 text-center text-white fw-bold ${event.category === 'upcoming' ? 'bg-danger' : 'bg-secondary'}`}>
          {event.category === 'upcoming' ? "UPCOMING EVENT" : "PREVIOUS EVENT RECAP"}
        </div>

        {event.image && (
          <img src={event.image} className="card-img-top" alt={event.name} style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }} />
        )}

        <div className="card-body p-4 p-md-5">
          <h1 className="fw-bold mb-3">{event.name}</h1>
          <p className="text-muted"><i className="fas fa-calendar-alt me-2"></i>{event.date} | <i className="fas fa-map-marker-alt me-2"></i>{event.venue}</p>
          <hr />
          
          <h4 className="fw-bold">Event Description</h4>
          <p className="text-secondary" style={{ whiteSpace: "pre-line" }}>{event.description}</p>
          
          {event.fullDetails && (
            <div className="mt-4">
              <h4 className="fw-bold">Highlights & Details</h4>
              <p style={{ whiteSpace: "pre-line" }}>{event.fullDetails}</p>
            </div>
          )}

          {event.category === "upcoming" && event.registration_link && (
            <div className="mt-5 text-center">
              <a 
                href={event.registration_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-lg btn-danger px-5 py-3 rounded-pill fw-bold shadow"
              >
                REGISTER NOW
              </a>
              <p className="small text-muted mt-2">* Click to open registration form</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;