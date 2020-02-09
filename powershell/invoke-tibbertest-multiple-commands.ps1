param
(
    [int]$port = 5000,
    [int]$commandPairs = 500,
    [int]$stepLength = 100000
)

$json = '{ "start": { "x": 1, "y": 2 }, "commands": []}'
$command1 = convertfrom-json "{ 'direction': 'east', 'steps': $stepLength }"
$command2 = convertfrom-json "{ 'direction': 'west', 'steps': $stepLength  }"
$obj = convertfrom-json -InputObject $json
for ($i = 0; $i -lt $commandPairs; $i++)
{
    $obj.commands += $command1
    $obj.commands += $command2
}
$json = convertto-json -InputObject $obj
#echo $json
$uri = "http://localhost:$port/tibber-developer-test/enter-path"
$contentType = 'application/json'
Invoke-WebRequest -Uri $uri -Method Post -Body $json -ContentType $contentType