using System.Collections.Generic;
using System.Threading.Tasks;
using GameAPI.Model;

namespace GameAPI.Data.Lobby
{
    public interface ILobbyRepository
    {
        Task SaveChangesAsync();
        Task<IEnumerable<LobbyModel>> GetLobbyListAsync();
        Task<LobbyModel> GetLobbyByIdAsync(Guid id);
        Task CreateLobbyAsync(LobbyModel lobbyModel);
        Task UpdateLobbyAsync(LobbyModel lobbyModel);
        Task DeleteLobbyAsync(LobbyModel lobbyModel);
    }
}