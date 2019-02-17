using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.Web.WebSockets;

namespace QueueSystemMVC.Controllers
{
    public class WebSocketController : ApiController
    {
        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            HttpContext context = HttpContext.Current;
            if (context.IsWebSocketRequest || context.IsWebSocketRequestUpgrading)
            {
                context.AcceptWebSocketRequest(new DisplayWebSocket());
                return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            };
        }
    }
}