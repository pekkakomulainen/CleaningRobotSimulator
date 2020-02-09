$json = '{ "start": { "x": 1, "y": 2 }, "commands": [{ "direction": "east", "steps": 1 }, {"direction": "north", "steps": 2}]}'
$obj = convertfrom-json -InputObject $json
$json = convertto-json -InputObject $obj
echo $json
$uri = 'http://localhost:5000/tibber-developer-test/enter-path'
$contentType = 'application/json'
Invoke-WebRequest -Uri $uri -Method Post -Body $json -ContentType $contentType