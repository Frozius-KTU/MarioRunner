using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Model;

namespace GameAPI.Data.Lobby
{
    public interface ILobbyRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<LobbyModel>> GetLobbyListAsync();
        Task<LobbyModel> GetLobbyByIdAsync(Guid id);
        Task CreateLobbyAsync(LobbyModel lobbyModel);
        Task UpdateLobbyAsync(LobbyModel lobbyModel);
        Task DeleteLobbyAsync(LobbyModel lobbyModel);
    }
}