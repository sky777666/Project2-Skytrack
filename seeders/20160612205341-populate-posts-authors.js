'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('authors', [
      { firstName: 'Keith',
        lastName: 'Fuller',
        bio: 'Key contributor to various newspapers in the Greater Puget Sound area. Father. Bike enthusiast.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { firstName: 'Bobby',
        lastName: 'Bobbington',
        bio: 'Adventurer, biking and hiking enthusiast.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { firstName: 'Misty',
        lastName: 'Owens',
        bio: 'Blogger in favor of public transit and community building in First Hill and Capitol Hill.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true }).then(function(authors) {
      return queryInterface.bulkInsert('articles', [
        { title: 'ISS Fly Over Watchers grow in San Jose.',
          content: 'Groups of people gather every week from the surrounding areas to watch the flyover.',
          authorId: authors[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { title: 'Home Pictures of the ISS',
          content: 'Celebrate community and expression at the next Capitol Hill Space Walk.',
          authorId: authors[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { title: 'Things To Do:  Watch the Sky ',
          content: 'This 2 mile hike is difficult enough to feel like an accomplishment, easy enough for most people to handle, and has a great view at the night sky.',
          authorId: authors[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    })
  }
}