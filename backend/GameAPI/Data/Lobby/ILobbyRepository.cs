using System.Collections.Generic;
using System.Threading.Tasks;
using GameAPI.Model;

namespace GameAPI.Data.Lobby
{
    public interface ILobbyRepository
    {
        Task SaveChangesAsync();
        Task<ICollection<LobbyModel>> GetLobbyListAsync();
        Task<LobbyModel> GetLobbyByIdAsync(Guid id);
        Task CreateLobbyAsync(LobbyModel request);
        Task UpdateLobbyAsync(LobbyModel request);
        Task DeleteLobbyAsync(LobbyModel request);
    }
}