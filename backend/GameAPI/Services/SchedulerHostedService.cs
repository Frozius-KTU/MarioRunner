using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using GameAPI.Hubs;
using GameAPI.Model;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace GameAPI.Services
{
    
    public class SchedulerHostedService : HostedServiceBase
    {
        private readonly ILogger<SchedulerHostedService> _logger;
        private readonly IOptions<TimerServiceConfiguration> _options;
        private readonly IHubContext<ChatHub> _hubContext;

        private readonly Random _random = new Random();

        public SchedulerHostedService(
        ILoggerFactory loggerFactory,
        IOptions<TimerServiceConfiguration> options,
        IHubContext<ChatHub> hubContext)
        {
            _logger = loggerFactory.CreateLogger<SchedulerHostedService>();
            _options = options;
            _hubContext = hubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            await RestartSignal();

            var val = 0;
            while (!cancellationToken.IsCancellationRequested)
            {
                val += 5;
                if(val >= 100) val = 0;
                var randomValue = val;//_random.Next(0, 100);

                //_logger.LogInformation($"Sending newCpuValue {randomValue}...");
                //_logger.LogInformation($"Laikas {_options.Value.Period*6}...");

                //await _hubContext.Clients.All.SendAsync("newCpuValue", randomValue);
                //_logger.LogInformation($"Ping...");

                /* HttpClientHandler clientHandler = new HttpClientHandler();
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
                HttpClient client = new HttpClient(clientHandler);
                var response = await client.GetAsync("https://localhost:5001/api/Lobby/");
                var finalData = await response.Content.ReadAsStringAsync();
                _logger.LogInformation(finalData);

                List<LobbyModel> _dataResponse = JsonConvert.DeserializeObject<List<LobbyModel>>(finalData);
                
                foreach (var _lobby in _dataResponse)
                {
                    LobbyModel lobby = new LobbyModel()
                    {
                        Id = _lobby.Id,
                        Name = _lobby.Name,
                        Player1 = _lobby.Player1,
                        Player2 = _lobby.Player2
                    };
                    
                    if(lobby.Player1 != null)
                    {
                        _logger.LogInformation($"Pinging player {lobby.Player1}...");
                        await _hubContext.Clients.All.SendAsync("Ping", lobby.Player1);
                    }
                    if(lobby.Player2 != null)
                    {
                        _logger.LogInformation($"Pinging player {lobby.Player2}...");
                        await _hubContext.Clients.All.SendAsync("Ping", lobby.Player2);
                    }
                }
                await Task.Delay(TimeSpan.FromMilliseconds(_options.Value.Period)*3, cancellationToken); */
                
                
                
                await Task.Delay(TimeSpan.FromMilliseconds(_options.Value.Period)*3, cancellationToken);
            }
        }

        async Task RestartSignal()
        {
            //Send server restart signal
            await Task.Delay(TimeSpan.FromMilliseconds(5000));
            for (int i = 0; i < 20; i++)
            {
                await Task.Delay(TimeSpan.FromMilliseconds(500));
                await _hubContext.Clients.All.SendAsync("Restart"); 
            }
        }
    }
}
