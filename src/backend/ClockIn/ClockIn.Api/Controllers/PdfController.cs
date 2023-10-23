using ClockIn.Application.DTOs.PdfDTOs;
using ClockIn.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ClockIn.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        public readonly IPdfService _pdfService;

        public PdfController(IPdfService pdfService)
        {
            _pdfService = pdfService;
        }

        [HttpPost()]
        public async Task<IActionResult> GeneratePDF([FromBody] PdfDTO pdfDTO)
        {
            try
            {
                var response = _pdfService.GeneratePdf(pdfDTO);
                string FileName = "contracheque_" + pdfDTO.EmployeeId + ".pdf";
                return File(response, "application/pdf", FileName);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
