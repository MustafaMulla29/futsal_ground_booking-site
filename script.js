// for navbar and scroll to top button
const nav = document.querySelector("#nav-section")
const navLinks = document.querySelectorAll('.nav-links')
const topBtn = document.querySelector("#top-btn")

function addBg() {
    if (nav) {
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            nav.style.background = '#ededed'
            navLinks.forEach((link) => {
                link.style.color = 'black'
            })
        }
        else {
            nav.style.background = "transparent"
            navLinks.forEach((link) => {
                link.style.color = 'white'
            })
        }
    } else {
        return false
    }
}

window.onscroll = function () {
    addBg()
}

function scrollTop() {
    window.scroll({ top: "0", left: "0", behavior: "smooth" })
}

if (topBtn) {
    topBtn.addEventListener('click', () => {
        scrollTop()
    })
}

//for hamburger
const hamburger = document.querySelector('.hamburger')
const ul = document.querySelector('ul')
const close = document.querySelector('.close')
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        ul.style.top = '0px'
        ul.style.width = '100%'
    })
}
if (close) {
    close.addEventListener('click', (e) => {
        ul.style.top = '-400px'
        // ul.style.width = ''
    })
}

//for ground booking validation and submission
const ground = document.querySelector('#grounds')
const price = document.querySelector("[name='price']")
const timeFrom = document.querySelector("[name='from']")
const timeTo = document.querySelector("[name='to']")
const amPmSelect = document.querySelector('#am-pm-select')
const bookingForm = document.querySelector('#booking-form')
const bookingDate = document.querySelector('[name="date"]')
const date = new Date()

let FiveASidePrice = '500 RS'
let NineASidePrice = '1000 RS'
let ElevenASidePrice = '1200 RS'

function changeGroundPrice() {
    if (amPmSelect.value === 'pm') {
        FiveASidePrice = '800 RS'
        NineASidePrice = '1200 RS'
        ElevenASidePrice = '1500 RS'
    } else {
        FiveASidePrice = '500 RS'
        NineASidePrice = '1000 RS'
        ElevenASidePrice = '1200 RS'
    }
}

function changeTotalPrice() {
    if (ground.value === '5') {
        price.value = FiveASidePrice
    } else if (ground.value === '9') {
        price.value = NineASidePrice
    } else if (ground.value === '11') {
        price.value = ElevenASidePrice
    } else {
        price.value = 'N/A'
    }
}

function validateDate() {
    if (bookingDate.value.slice(0, 4) != date.getFullYear()) {
        alert('Please select a valid date')
        return false
    } else {
        return true
    }
}

if (bookingDate) {
    bookingDate.addEventListener('change', (e) => {
        bookingDate.value = e.target.value
        validateDate()
    })
}
if (ground) {
    ground.addEventListener('change', (e) => {
        ground.value = e.target.value
        changeGroundPrice()
        changeTotalPrice()
    })
}

if (amPmSelect) {
    amPmSelect.addEventListener('change', (e) => {
        amPmSelect.value = e.target.value
        changeGroundPrice()
        changeTotalPrice()
    })
}

if (timeFrom) {
    timeFrom.addEventListener('input', (e) => {
        const fromValue = e.target.value
        const parseValue = parseInt(fromValue)
        timeFrom.value = fromValue
        if (fromValue === '0' || isNaN(fromValue)) {
            setTimeout(() => {
                alert('Please enter a valid time!')
            }, 100);
        } else if (parseValue > 12) {
            setTimeout(() => {
                alert('Please enter a valid time hour!')
            }, 100);
        } else if (parseValue == 12) {
            timeTo.value = 1
        } else if (((parseValue >= 1 && parseValue <= 7) && amPmSelect.value === 'am') || ((parseValue == 6 || parseValue == 7) && amPmSelect.value === 'pm')) {
            setTimeout(() => {
                alert('Please select according to the ground timings! ')
            }, 100);
        } else if ((parseValue === 12 || parseValue < 3) && amPmSelect.value === 'pm') {
            setTimeout(() => {
                alert('Please select according to the ground timings! ')
            }, 500);
        } else if ((parseValue === 6 || parseValue > 6) && amPmSelect.value === 'pm') {
            setTimeout(() => {
                alert('Please select according to the ground timings! ')
            }, 500);
        } else {
            timeTo.value = parseValue + 1
        }

    })
}

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (validateDate() === true) {
            window.location.href = 'thankYou.html'
        }
    })

}
