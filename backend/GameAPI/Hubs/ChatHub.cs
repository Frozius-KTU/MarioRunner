using System.Net.Http;
using System.Threading.Tasks;
using GameAPI.Model;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using System.Text;

namespace GameAPI.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(ChatMessage chatMessage)
    {
        await Clients.All.SendAsync("Send", chatMessage);
    }

    public async Task CreateClient(ClientModel request)
    {
        


        HttpClientHandler clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        // Pass the handler to httpclient(from you are calling api)
        HttpClient client = new HttpClient(clientHandler);

        for (int i = 0; i < 3; i++)
        {
            try
            {
                Guid id = Guid.NewGuid();
                Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!   Guid = " + id);
                request.Id = id;

                string jsonString = JsonSerializer.Serialize(request);
                var stringContent = new StringContent(jsonString, Encoding.UTF8, "application/json");

                Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + jsonString);
                //Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + stringContent);
                HttpResponseMessage response = await client.PostAsync("https://localhost:5001/api/Client", stringContent);

                //Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + response.StatusCode.ToString());
                if(response.StatusCode.ToString() == "OK" || response.StatusCode.ToString() == "NoContent" || response.StatusCode.ToString() == "Created")
                {
                    await Clients.Caller.SendAsync("ClientCreated", request);
                    break;
                }
                else
                {
                    Console.WriteLine("Client creation unsucessful!");
                }

            }
            catch (System.Exception)
            {
                throw;
            }
        }
        
    }
}

