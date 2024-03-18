using AngularServer.Classes;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularServer.NewFolder
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/<User>
        private static int count = 3;
        private static List<User> users = new List<User>() { new User() { Address="בני ברק ברלב 10", Code="1",Name="דיתי",Email="diti@as", Password="123456"},
        new User() { Address="בני ברק0", Code="2",Name="שרי",Email="sarik@as", Password="123456"}};
        [HttpGet]
        public List<User> Get()
        {
            return users;
        }

        // GET api/<User>/5
        [HttpGet("{id}")]
        public User Get(string id)
        {
            return users.Find(x => x.Code == id);
        }

        // POST api/<User>
        [HttpPost]
        public void Post([FromBody] User value)
        {
            value.Code = count++.ToString();
            users.Add(value);

        }

        // PUT api/<User>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<User>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
