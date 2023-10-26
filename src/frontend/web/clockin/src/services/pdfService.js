import  api  from "../http/api";

const generatePdf = async (pdfData) => {
  const { htmlContent, employeeId } = pdfData;
  try {
    const response = await api.post(
      "/pdf",
      {
        htmlContent: htmlContent,
        employeeId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
        },
        responseType: "blob",
      }
    );
    const fileUrl = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    window.open(fileUrl);
  } catch (error) {
    console.error("Houve um erro ao gerar o PDF:", error);
  }
};

export { generatePdf };
