<# 
.SYNOPSIS
Demonstrates a sample PowerShell function with parameters and error handling

.DESCRIPTION
This function shows a greeting message and processes input numbers. It includes:
- Parameter validation
- Error handling
- Pipeline input support
- Help documentation
#>
function Invoke-SampleFunction {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory=$true, 
                   ValueFromPipeline=$true,
                   HelpMessage="Enter your name")]
        [string]$Name,

        [Parameter(HelpMessage="Numbers to process")]
        [int[]]$Numbers = @(1, 2, 3)
    )

    begin {
        # Initialization code
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Verbose "Processing started at $timestamp"
    }

    process {
        try {
            # Show greeting
            Write-Output "Hello $Name, welcome to PowerShell!"

            # Process numbers
            $results = $Numbers | ForEach-Object {
                if ($_ -le 0) {
                    throw "Invalid number: $_ must be positive"
                }
                [PSCustomObject]@{
                    Original = $_
                    Squared  = $_ * $_
                    Cubed    = $_ * $_ * $_
                }
            }

            # Return formatted results
            $results | Format-Table -AutoSize
        }
        catch {
            Write-Error "Error processing: $_"
        }
    }

    end {
        Write-Verbose "Processing completed at $(Get-Date -Format 'HH:mm:ss')"
    }
}

# Example usage:
# "John" | Invoke-SampleFunction -Numbers 2,4,6 -Verbose
# Invoke-SampleFunction -Name "Alice" -Numbers 1..5