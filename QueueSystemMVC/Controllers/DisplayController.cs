using Microsoft.Web.WebSockets;
using System.Web.Mvc;

using QueueSystemMVC.Models;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;

namespace QueueSystemMVC.Controllers
{
    public class DisplayController : Controller
    {
        // GET: Display
        public ActionResult Display()
        {
            return View();
        }
    }


}