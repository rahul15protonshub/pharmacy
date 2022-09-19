Get-ChildItem -Directory | ForEach-Object {
    if (Test-Path -Path ($_.FullName + "\coverage\clover.xml") -PathType Leaf) {
        [xml]$content = Get-Content ($_.FullName + "\coverage\clover.xml");
        $coverage = ([int]$content.coverage.project.metrics.coveredstatements / [int]$content.coverage.project.metrics.statements)
        if ($coverage -ge 0.5) {
            Write-Host "Block $($_.Name) Coverage: $([Math]::Round($coverage, 3).ToString('P1'))" -ForegroundColor Green;
        }
        else {
            Write-Host "Block $($_.Name) Coverage: $([Math]::Round($coverage, 3).ToString('P1'))" -ForegroundColor Red;
        }
    }
}