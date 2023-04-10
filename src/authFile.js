const { google } = require('googleapis')

const { OAuth2 } = google.auth

const oAuth2Client = new OAuth2(
    '182418282490-7ciq6l00pv7mcb2i98v85pc20jm4q4gr.apps.googleusercontent.com',
    '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'
    )

oAuth2Client.setCredentials({
    refresh_token:'1//04oOUzVoWnN0ZCgYIARAAGAQSNwF-L9Irzs8K9GfnvmoiAJUfv3_AhcGm3mpb497KvLBuK21ZCrGKxBcTN8HW-cB84aioyio7IyY'
})

module.exports={
    oAuth2Client
}