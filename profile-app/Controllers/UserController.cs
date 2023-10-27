using profile_app.Data;
using profile_app.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace profile_app.Controllers
{
    [ApiController]
    [Route("api/")]
    public class UserController : Controller
    {
        private readonly UserAPIDbContext dbContext;

        public UserController(UserAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("getDataUser/{userid}")]
        public async Task<IActionResult> GetUserById(string userid)
        {
            if (userid.ToLower() == "all")
            {
                return Ok(await dbContext.tbl_user.ToListAsync());
            }

            if (!Guid.TryParse(userid, out Guid userGuid))
            {
                return BadRequest("Invalid user ID format.");
            }

            var user = await dbContext.tbl_user.FindAsync(userGuid);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpDelete]
        [Route("delDataUser/{userid:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid userid)
        {
            var user = await dbContext.tbl_user.FindAsync(userid);

            if (user != null)
            {
                dbContext.Remove(user);
                await dbContext.SaveChangesAsync();
                return Ok(user);
            }

            return NotFound();
        }

        [HttpPost("setDataUser")]
        public async Task<IActionResult> AddUser(AddUserRequest addUserRequest)
        {
            var user = new User()
            {
                userid = Guid.NewGuid(),
                namalengkap = addUserRequest.namalengkap,
                username = addUserRequest.username,
                password = addUserRequest.password,
                status = addUserRequest.status,
            };

            await dbContext.tbl_user.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return Ok(user);
        }
    }
}
