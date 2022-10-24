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

    public override Task OnConnectedAsync()
    {
        // Add your own code here.
        // For example: in a chat application, mark the user as offline, 
        // delete the association between the current connection id and user name.
        Console.WriteLine(base.Context.ConnectionId);
        Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + base.Context.ConnectionId);
        Clients.Caller.SendAsync("SignalRCreated", base.Context.ConnectionId);
        
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        // Add your own code here.
        // For example: in a chat application, mark the user as offline, 
        // delete the association between the current connection id and user name.
        Console.WriteLine(base.Context.ConnectionId);
        Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + base.Context.ConnectionId);

        
        return base.OnDisconnectedAsync(exception);
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
                //Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!   Guid = " + id);
                request.Id = id;

                string jsonString = JsonSerializer.Serialize(request);
                var stringContent = new StringContent(jsonString, Encoding.UTF8, "application/json");

                //Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + jsonString);
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


    public async Task ConnectClientToLobby(Guid clientId, Guid lobbyId)
    {
        HttpClientHandler clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        // Pass the handler to httpclient(from you are calling api)
        HttpClient client = new HttpClient(clientHandler);

        
        try
        {

            ///Update Lobby
            HttpResponseMessage response = await client.GetAsync("https://localhost:5001/api/Lobby/" + lobbyId + "/add/" + clientId);

            if(response.StatusCode.ToString() == "NotAcceptable")
            {
                await Clients.Caller.SendAsync("ClientUpdated", "406");
            }
            else if(response.StatusCode.ToString() == "NotFound")
            {
                await Clients.Caller.SendAsync("ClientUpdated", "404");
            }
            else
            {
                //Update Client
                ClientModel clientRequest = new ClientModel();
                clientRequest.LobbyId = lobbyId;
            
                string jsonString = JsonSerializer.Serialize(clientRequest);
                var stringContent = new StringContent(jsonString, Encoding.UTF8, "application/json");

                //Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + jsonString);
                //Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + stringContent);
                response = await client.PutAsync("https://localhost:5001/api/Client/" + clientId, stringContent);

                if(response.StatusCode.ToString() == "NotFound")
                {
                    await Clients.Caller.SendAsync("ClientUpdated", "404");
                }
                else
                {
                    await Clients.Caller.SendAsync("ClientUpdated", "200");
                }
            }

        }
        catch (System.Exception)
        {
            throw;
        }
        
    }


    public async Task DisconnectClientFromLobby(Guid clientId, Guid lobbyId)
    {
        HttpClientHandler clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
        // Pass the handler to httpclient(from you are calling api)
        HttpClient client = new HttpClient(clientHandler);

        
        try
        {
            ClientModel clientRequest = new ClientModel();
            clientRequest.LobbyId = new Guid();
            
            string jsonString = JsonSerializer.Serialize(clientRequest);
            var stringContent = new StringContent(jsonString, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PutAsync("https://localhost:5001/api/Client/" + clientId, stringContent);

            response = await client.DeleteAsync("https://localhost:5001/api/Lobby/" + lobbyId + "/remove/" + clientId);
            
            await Clients.Caller.SendAsync("ClientUpdated", "200");
                
        }
        catch (System.Exception)
        {
            throw;
        }
        
    }
}

