using System.Threading.Tasks;
using GameAPI.Model;
using Microsoft.AspNetCore.SignalR;

namespace GameAPI.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(ChatMessage chatMessage)
        {
            await Clients.All.SendAsync("Send", chatMessage);
            
        }
    }
}
