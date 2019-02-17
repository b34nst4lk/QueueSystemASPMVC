using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using QueueSystemMVC.Models;

namespace QueueSystemMVC.Controllers
{
    public class DisplayWebSocket: WebSocketHandler
    {
        private static WebSocketCollection clients = new WebSocketCollection(); 

        public override void OnOpen()
        {
            clients.Add(this);
            base.OnOpen();
        }
        
        public override void OnClose()
        {
            clients.Remove(this);
            base.OnClose();
        }

        public void Broadcast(Message m) => clients.Broadcast(JsonConvert.SerializeObject(m));
        public void CallNext(Queue q) => Broadcast(new Message(Type.CALL_NEXT, q));
        public void CallAgain(Queue q) => Broadcast(new Message(Type.CALL_AGAIN, q));
        public void SkipNumber(Queue q) => Broadcast(new Message(Type.SKIP_NUMBER, q));
    }
}