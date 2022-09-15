$total = 0;
$count = 0;
Get-ChildItem -Directory | ForEach-Object {
    if (Test-Path -Path ($_.FullName + "\coverage\clover.xml") -PathType Leaf) {
        [xml]$content = Get-Content ($_.FullName + "\coverage\clover.xml");
        $coverage = ([int]$content.coverage.project.metrics.coveredstatements / [int]$content.coverage.project.metrics.statements)
        if ($coverage -ge 0.75) {
            Write-Host "Block $($_.Name) Coverage: $([Math]::Round($coverage, 2))" -ForegroundColor Green;
        }
        else {
            Write-Host "Block $($_.Name) Coverage: $([Math]::Round($coverage, 2))" -ForegroundColor Red;
        }
        
        $total += $coverage
        $count += 1
    }
}
Write-Host "WHOLE COVERAGE: $([Math]::Round(($total / $count), 2))" -ForegroundColor Black -BackgroundColor Yellow