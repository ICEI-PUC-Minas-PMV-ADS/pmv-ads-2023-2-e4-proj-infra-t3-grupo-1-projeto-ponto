using ClockIn.Application.DTOs.PdfDTOs;
using ClockIn.Application.Interfaces;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using PdfSharpCore.Fonts;
using TheArtOfDev.HtmlRenderer.PdfSharp;


namespace ClockIn.Application.Services
{
    public class PdfService : IPdfService
    {

        public PdfService()
        {
        }

        public byte[] GeneratePdf(PdfDTO pdfDTO)
        {
            var document = new PdfDocument();
            var htmlContent = pdfDTO.HtmlContent.Replace("</tfoot></table>", "<tr><td colspan=\"4\" style=\"padding: 10px;\"> Assinatura: ____________________________________________________ </td></tr></tfoot></table>");
            PdfGenerator.AddPdfPages(document, htmlContent, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                int pages = document.PageCount;
                document.Save(ms);
                response = ms.ToArray();
            }
            return response;
        }
    }
}
