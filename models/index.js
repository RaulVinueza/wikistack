const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack',{
    logging: false
})

const Page = db.define('pages',{
    title: {
            type: Sequelize.STRING,
            allowNull: false
            },
    urlTitle: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {isUrl: true},
            getterMethods: {
                route(){
                    
                    let url = this.getDataValue('urlTitle')
                    return '/wiki/' + url
                }
            }
            
            },
    content: {
            type: Sequelize.TEXT,
            allowNull: false
            },
    status: {
            type: Sequelize.ENUM('open','closed'),
            defaultValue: 'closed'
            },
    date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
    },
    

})

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {isEmail: true}
        
    }
})


module.exports = {
    db: db,
    Page: Page,
    User: User
}