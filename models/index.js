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


function urlTitle(title){
    let nonAlpha = /\W+/g
    let space = /\s+/g
    if (title){
        return title.replace(space, '_').replace(nonAlpha, '')      
    } else {
        return Math.random().toString(36).substring(2, 7);
    }

}

Page.addHook('beforeValidate', (page, options) =>{
    
    // return new Promise((resolve, reject) => {
        page.urlTitle = urlTitle(page.title)
        
    //     if (err) reject(err);
    //     else (resolve)       
    // })
        
})



const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        
        
    }
})

Page.belongsTo(User, {as: 'author'})


module.exports = {
    db: db,
    Page: Page,
    User: User
}