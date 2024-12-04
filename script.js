document.addEventListener('DOMContentLoaded', () => {
  const learnMoreBtn = document.querySelector('#learn-more-trigger')
  const content = document.querySelector('#learn-more')

  // Load initial state from localStorage
  const isHidden = localStorage.getItem('learnMoreHidden') !== 'false'
  content.classList.toggle('hidden', isHidden)

  // Set initial arrow rotation
  const icon = learnMoreBtn.querySelector('.icon')
  icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)'

  learnMoreBtn.addEventListener('click', () => {
    // Toggle content visibility
    content.classList.toggle('hidden')

    // Save state to localStorage
    localStorage.setItem('learnMoreHidden', content.classList.contains('hidden'))

    // Rotate arrow icon when expanded
    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)'
  })

  // Range input handlers
  const rangeInputs = {
    'rfps-per-year-slider': 'rfps-per-year-number',
    'deal-size-slider': 'deal-size-number',
    'hours-per-rfp-slider': 'hours-per-rfp-number',
  }

  // Helper functions for formatting
  const formatCurrency = (value) => `$${Number(value).toLocaleString()}`
  const formatRFPs = (value) => `${value} RFPs`
  const formatHours = (value) => `${value} hours`

  // Map field IDs to their formatting functions
  const formatters = {
    'deal-size-number': formatCurrency,
    'rfps-per-year-number': formatRFPs,
    'hours-per-rfp-number': formatHours,
  }

  Object.entries(rangeInputs).forEach(([sliderId, numberId]) => {
    const slider = document.querySelector(`#${sliderId}`)
    const numberDisplay = document.querySelector(`#${numberId}`)
    const format = formatters[numberId]

    // Load saved value from localStorage or use the default value from HTML
    const savedValue = localStorage.getItem(sliderId) || slider.value
    slider.value = savedValue
    numberDisplay.textContent = format(savedValue)

    slider.addEventListener('input', () => {
      const value = slider.value
      numberDisplay.textContent = format(value)
      localStorage.setItem(sliderId, value)
      calculateAndDisplayData()
    })
  })

  // Calculate and display all data
  function calculateAndDisplayData() {
    const rfpsPerYear = Number(document.querySelector('#rfps-per-year-slider').value)
    const hoursPerRfp = Number(document.querySelector('#hours-per-rfp-slider').value)
    const dealSize = Number(document.querySelector('#deal-size-slider').value)
    const automationEfficiency = Number(document.querySelector('#automation-efficiency-input').value) / 100
    const hourlyRate = Number(document.querySelector('#hourly-rate-input').value)
    const winRate = Number(document.querySelector('#win-rate-input').value) / 100
    const biggerCapacity = Number(document.querySelector('#bigger-capacity-input').value) / 100

    // Calculate and display annual time saved
    const annualTimeSaved = Math.round(rfpsPerYear * hoursPerRfp * automationEfficiency)
    document.querySelector('#annual-time-saved').textContent = `${annualTimeSaved.toLocaleString()}h`

    // Calculate and display cost savings using dynamic hourly rate
    const annualCostSaved = annualTimeSaved * hourlyRate
    document.querySelector('#annual-cost-saved').textContent = `$${annualCostSaved.toLocaleString()}`

    // Calculate and display revenue growth
    const annualRevenueGrowth =
      ((annualTimeSaved * biggerCapacity) / (hoursPerRfp * automationEfficiency)) * dealSize * winRate
    document.querySelector('#annual-revenue-growth').textContent = `$${annualRevenueGrowth.toLocaleString()}`
  }

  // Update all event listeners
  const automationEfficiencyInput = document.querySelector('#automation-efficiency-input')
  automationEfficiencyInput.addEventListener('input', calculateAndDisplayData)

  const hourlyRateInput = document.querySelector('#hourly-rate-input')
  hourlyRateInput.addEventListener('input', calculateAndDisplayData)

  const winRateInput = document.querySelector('#win-rate-input')
  winRateInput.addEventListener('input', calculateAndDisplayData)

  const biggerCapacityInput = document.querySelector('#bigger-capacity-input')
  biggerCapacityInput.addEventListener('input', calculateAndDisplayData)

  // Calculate initial values
  calculateAndDisplayData()

  // Check the domain parameter
  const urlParams = new URLSearchParams(window.location.search)
  const showLogo = urlParams.get('showHeader')

  const logoElement = document.getElementById('header') // Assuming your logo has this ID

  if (showLogo === 'true') {
    logoElement.style.display = 'block' // Show logo
  } else {
    logoElement.style.display = 'none' // Hide logo
  }
})
