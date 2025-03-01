# Define client credentials
$clientId = "f5fc11e783fb43a8b0371fc332935691"
$clientSecret = "803fbe9edeea41888a45ee8e0e2468dd"
$apiUrl = "https://accounts.spotify.com/api/token"

# Define headers
$headers = @{
    "Content-Type" = "application/x-www-form-urlencoded"
}

# Define body parameters
$body = @{
    grant_type    = "client_credentials"
    client_id     = $clientId
    client_secret = $clientSecret
}

# Make the API request
$response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body

# Output the access token
$response | ConvertTo-Json -Depth 3
