import { useEffect, useState } from "react";
import { supabase } from "../supabase";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const VerifyCertificate = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [certificates, setCertificates] = useState([]);

  const [formData, setFormData] = useState({
    certificateId: "",
    name: "",
    college: "",
    issueDate: "",
    roll: "",
    department: "",
    year: "",
    event: "",
  });

  const [certificateFile, setCertificateFile] = useState(null);

  const fetchCertificates = async () => {
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setCertificates(data);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCertificates();
    }
  }, [isAdmin]);

  const handleVerify = async () => {
    if (!certificateId) return;

    setLoading(true);
    setResult(null);

    const { data } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificateId", certificateId)
      .single();

    if (data) {
      setResult({
        success: true,
        data,
      });
    } else {
      setResult({
        success: false,
      });
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();

    if (!certificateFile) {
      alert("Upload certificate file");
      return;
    }

    setLoading(true);

    try {
      const fileExt = certificateFile.name
        .split(".")
        .pop();

      const fileName =
        `${formData.certificateId}.${fileExt}`;

      const { error: uploadError } = await supabase
        .storage
        .from("certificates")
        .upload(fileName, certificateFile, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase
        .storage
        .from("certificates")
        .getPublicUrl(fileName);

      const { error } = await supabase
        .from("certificates")
        .insert([
          {
            ...formData,
            file: publicUrl,
          },
        ]);

      if (error) {
        throw error;
      }

      alert("Certificate Added");

      setFormData({
        certificateId: "",
        name: "",
        college: "",
        issueDate: "",
        roll: "",
        department: "",
        year: "",
        event: "",
      });

      setCertificateFile(null);

      fetchCertificates();

    } catch (error) {
      console.log(error);
      alert("Error");
    }

    setLoading(false);
  };

  const handleDelete = async (id, fileUrl) => {

    if (!window.confirm("Delete certificate?")) {
      return;
    }

    try {

      const fileName = fileUrl.split("/").pop();

      await supabase
        .storage
        .from("certificates")
        .remove([fileName]);

      await supabase
        .from("certificates")
        .delete()
        .eq("id", id);

      fetchCertificates();

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (cert) => {

    setFormData({
      certificateId: cert.certificateId,
      name: cert.name,
      college: cert.college || "",
      issueDate: cert.issueDate,
      roll: cert.roll || "",
      department: cert.department || "",
      year: cert.year || "",
      event: cert.event,
    });
  };

  const handleUpdate = async () => {

    setLoading(true);

    try {

      let publicUrl = null;

      if (certificateFile) {

        const fileExt = certificateFile.name
          .split(".")
          .pop();

        const fileName =
          `${formData.certificateId}.${fileExt}`;

        await supabase
          .storage
          .from("certificates")
          .upload(fileName, certificateFile, {
            upsert: true,
          });

        const {
          data,
        } = supabase
          .storage
          .from("certificates")
          .getPublicUrl(fileName);

        publicUrl = data.publicUrl;
      }

      const updateData = {
        ...formData,
      };

      if (publicUrl) {
        updateData.file = publicUrl;
      }

      await supabase
        .from("certificates")
        .update(updateData)
        .eq(
          "certificateId",
          formData.certificateId
        );

      alert("Updated Successfully");

      setFormData({
        certificateId: "",
        name: "",
        college: "",
        issueDate: "",
        roll: "",
        department: "",
        year: "",
        event: "",
      });

      setCertificateFile(null);

      fetchCertificates();

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };



const handleDownloadPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "All Certificate List",
    14,
    20
  );

  const tableColumn = [
    "Certificate ID",
    "Name",
    "College",
    "Department",
    "Year",
    "Event",
  ];

  const tableRows = [];

  certificates.forEach((cert) => {

    const certData = [
      cert.certificateId,
      cert.name,
      cert.college || "-",
      cert.department || "-",
      cert.year || "-",
      cert.event || "-",
    ];

    tableRows.push(certData);

  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("certificate-list.pdf");

};




  return (
    <div className="container py-5">

      <div className="text-center mb-5">

        <h2 className="fw-bold mb-4">
          Certificate Verification
        </h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Certificate ID"
          onChange={(e) =>
            setCertificateId(e.target.value)
          }
        />

        <button
          className="btn btn-success"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading
            ? "Verifying..."
            : "Verify"}
        </button>

      </div>

      {result && result.success && (
        <div className="card p-4 shadow mb-5">

          <h4 className="text-success mb-3">
            Valid Certificate
          </h4>

          <p>
            <b>Name:</b> {result.data.name}
          </p>

          {result.data.college && (
            <p>
              <b>College:</b> {result.data.college}
            </p>
          )}

          {result.data.department && (
            <p>
              <b>Department:</b> {result.data.department}
            </p>
          )}

          {result.data.roll && (
            <p>
              <b>Roll:</b> {result.data.roll}
            </p>
          )}

          {result.data.year && (
            <p>
              <b>Year:</b> {result.data.year}
            </p>
          )}

          <p>
            <b>Event:</b> {result.data.event}
          </p>

          <p>
            <b>Issue Date:</b> {result.data.issueDate}
          </p>

          <a
            href={result.data.file}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Download Certificate
          </a>

        </div>
      )}

      {result && !result.success && (
        <div className="alert alert-danger mb-5">
          Invalid Certificate ID
        </div>
      )}

      {isAdmin && (

        <div className="card shadow border-0 rounded-4 p-4">

          <h3 className="fw-bold mb-4">
            Admin Certificate Panel
          </h3>

          <form onSubmit={handleAddCertificate}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="certificateId"
                  placeholder="Certificate ID"
                  className="form-control"
                  value={formData.certificateId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="college"
                  placeholder="College"
                  className="form-control"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="issueDate"
                  placeholder="Issue Date"
                  className="form-control"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="roll"
                  placeholder="Roll"
                  className="form-control"
                  value={formData.roll}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  className="form-control"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="event"
                  placeholder="Event"
                  className="form-control"
                  value={formData.event}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-4">

                <input
                  type="file"
                  className="form-control"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  required
                />

              </div>

            </div>

            <div className="d-flex gap-3">

              <button
                type="submit"
                className="btn btn-success"
              >
                Add Certificate
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Certificate
              </button>

            </div>

          </form>

          <hr className="my-5" />

         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

  <h4 className="fw-bold m-0">
    All Certificates
  </h4>

  <button
    className="btn btn-dark"
    onClick={handleDownloadPDF}
  >
    Download PDF
  </button>

</div>

          <div className="table-responsive">

            <table className="table table-bordered">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {certificates.map((cert) => (

                  <tr key={cert.id}>

                    <td>
                      {cert.certificateId}
                    </td>

                    <td>
                      {cert.name}
                    </td>

                    <td>
                      {cert.event}
                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            handleEdit(cert)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(
                              cert.id,
                              cert.file
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
};

export default VerifyCertificate;