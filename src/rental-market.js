const marketProfiles = {
    'Nairobi County': {
        Kasarani: { 'Single room': [4000, 7000], Bedsitter: [8000, 13000], 'One bedroom': [14000, 22000], 'Two bedroom': [24000, 38000] },
        Roysambu: { 'Single room': [5000, 8000], Bedsitter: [10000, 16000], 'One bedroom': [18000, 28000], 'Two bedroom': [30000, 48000] },
        Westlands: { 'Single room': [10000, 16000], Bedsitter: [18000, 28000], 'One bedroom': [30000, 50000], 'Two bedroom': [50000, 85000] },
        Kilimani: { 'Single room': [9000, 14000], Bedsitter: [16000, 26000], 'One bedroom': [28000, 45000], 'Two bedroom': [50000, 80000] },
        Embakasi: { 'Single room': [3500, 6000], Bedsitter: [7000, 11000], 'One bedroom': [12000, 18000], 'Two bedroom': [18000, 28000] },
    },
    'Mombasa County': {
        Nyali: { 'Single room': [7000, 11000], Bedsitter: [12000, 20000], 'One bedroom': [22000, 35000], 'Two bedroom': [35000, 60000] },
        Bamburi: { 'Single room': [4000, 7000], Bedsitter: [8000, 13000], 'One bedroom': [14000, 22000], 'Two bedroom': [22000, 35000] },
        Kisauni: { 'Single room': [3000, 5500], Bedsitter: [6000, 10000], 'One bedroom': [10000, 16000], 'Two bedroom': [16000, 26000] },
        'Mombasa Island': { 'Single room': [5000, 8000], Bedsitter: [9000, 15000], 'One bedroom': [16000, 26000], 'Two bedroom': [26000, 42000] },
        Likoni: { 'Single room': [2500, 4500], Bedsitter: [5000, 8500], 'One bedroom': [9000, 14000], 'Two bedroom': [14000, 22000] },
    },
    'Kisumu County': {
        Milimani: { 'Single room': [6000, 9000], Bedsitter: [10000, 16000], 'One bedroom': [18000, 28000], 'Two bedroom': [28000, 45000] },
        Kondele: { 'Single room': [3000, 5000], Bedsitter: [5500, 9000], 'One bedroom': [9000, 14000], 'Two bedroom': [14000, 22000] },
        Mamboleo: { 'Single room': [4000, 7000], Bedsitter: [8000, 13000], 'One bedroom': [14000, 22000], 'Two bedroom': [22000, 35000] },
        Manyatta: { 'Single room': [2500, 4500], Bedsitter: [5000, 8000], 'One bedroom': [8500, 13000], 'Two bedroom': [13000, 21000] },
        'Riat Hills': { 'Single room': [5000, 8000], Bedsitter: [9000, 14000], 'One bedroom': [15000, 24000], 'Two bedroom': [24000, 38000] },
    },
    'Nakuru County': {
        'Nakuru Town': { 'Single room': [3000, 5000], Bedsitter: [6000, 10000], 'One bedroom': [10000, 16000], 'Two bedroom': [16000, 26000] },
        Milimani: { 'Single room': [6000, 9000], Bedsitter: [10000, 16000], 'One bedroom': [18000, 28000], 'Two bedroom': [30000, 45000] },
        'Section 58': { 'Single room': [4000, 6500], Bedsitter: [7500, 12000], 'One bedroom': [13000, 20000], 'Two bedroom': [20000, 32000] },
        Kiamunyi: { 'Single room': [3500, 6000], Bedsitter: [7000, 11000], 'One bedroom': [12000, 18000], 'Two bedroom': [18000, 28000] },
        Pipeline: { 'Single room': [2500, 4500], Bedsitter: [5000, 8500], 'One bedroom': [9000, 14000], 'Two bedroom': [14000, 22000] },
    },
    'Kiambu County': {
        Ruiru: { 'Single room': [3500, 6000], Bedsitter: [7000, 12000], 'One bedroom': [13000, 20000], 'Two bedroom': [20000, 32000] },
        Thika: { 'Single room': [3000, 5000], Bedsitter: [6000, 10000], 'One bedroom': [11000, 17000], 'Two bedroom': [18000, 28000] },
        Kikuyu: { 'Single room': [3500, 6000], Bedsitter: [7000, 11000], 'One bedroom': [12000, 18000], 'Two bedroom': [18000, 28000] },
        Limuru: { 'Single room': [2500, 4500], Bedsitter: [5000, 8000], 'One bedroom': [8500, 13000], 'Two bedroom': [13000, 21000] },
        'Kiambu Town': { 'Single room': [3000, 5000], Bedsitter: [6000, 10000], 'One bedroom': [10000, 16000], 'Two bedroom': [16000, 26000] },
    },
    'Uasin Gishu County': {
        'Eldoret CBD': { 'Single room': [3500, 6000], Bedsitter: [7000, 12000], 'One bedroom': [13000, 20000], 'Two bedroom': [20000, 32000] },
        Kapsoya: { 'Single room': [5000, 8000], Bedsitter: [9000, 15000], 'One bedroom': [16000, 25000], 'Two bedroom': [28000, 42000] },
        Pioneer: { 'Single room': [3500, 6000], Bedsitter: [7000, 11000], 'One bedroom': [12000, 18000], 'Two bedroom': [18000, 28000] },
        'Elgon View': { 'Single room': [5000, 8000], Bedsitter: [9000, 14000], 'One bedroom': [15000, 23000], 'Two bedroom': [24000, 38000] },
        Annex: { 'Single room': [3000, 5000], Bedsitter: [6000, 10000], 'One bedroom': [11000, 17000], 'Two bedroom': [17000, 26000] },
    },
    'Machakos County': {
        'Machakos Town': { 'Single room': [4000, 7000], Bedsitter: [8000, 13000], 'One bedroom': [14000, 22000], 'Two bedroom': [24000, 38000] },
        Mavoko: { 'Single room': [3000, 5500], Bedsitter: [6000, 10000], 'One bedroom': [11000, 17000], 'Two bedroom': [17000, 27000] },
        'Athi River': { 'Single room': [4000, 6500], Bedsitter: [8000, 13000], 'One bedroom': [14000, 22000], 'Two bedroom': [22000, 35000] },
        Syokimau: { 'Single room': [6000, 10000], Bedsitter: [11000, 18000], 'One bedroom': [20000, 32000], 'Two bedroom': [35000, 55000] },
        'Kangundo Road': { 'Single room': [2500, 4500], Bedsitter: [5000, 8000], 'One bedroom': [8500, 13000], 'Two bedroom': [13000, 21000] },
    },
    'Kajiado County': {
        Kitengela: { 'Single room': [3500, 6000], Bedsitter: [7000, 12000], 'One bedroom': [13000, 20000], 'Two bedroom': [20000, 32000] },
        Rongai: { 'Single room': [4000, 7000], Bedsitter: [8000, 13000], 'One bedroom': [14000, 22000], 'Two bedroom': [22000, 35000] },
        Ngong: { 'Single room': [4500, 7500], Bedsitter: [9000, 14000], 'One bedroom': [15000, 24000], 'Two bedroom': [24000, 38000] },
        Kiserian: { 'Single room': [3000, 5000], Bedsitter: [6000, 10000], 'One bedroom': [11000, 17000], 'Two bedroom': [17000, 26000] },
        Oloosuyian: { 'Single room': [2500, 4500], Bedsitter: [5000, 8000], 'One bedroom': [8500, 13000], 'Two bedroom': [13000, 21000] },
    },
    "Murang'a County": {
        "Murang'a Town": { 'Single room': [2500, 4500], Bedsitter: [5000, 8000], 'One bedroom': [8500, 13000], 'Two bedroom': [13000, 21000] },
        Mukuyu: { 'Single room': [3500, 6000], Bedsitter: [7000, 11000], 'One bedroom': [12000, 18000], 'Two bedroom': [18000, 28000] },
        Gakoigo: { 'Single room': [2500, 4500], Bedsitter: [5000, 8000], 'One bedroom': [8500, 13000], 'Two bedroom': [13000, 20000] },
        Mumbi: { 'Single room': [3000, 5000], Bedsitter: [6000, 9500], 'One bedroom': [10000, 15000], 'Two bedroom': [15000, 24000] },
        Ihura: { 'Single room': [2500, 4000], Bedsitter: [4500, 7500], 'One bedroom': [8000, 12000], 'Two bedroom': [12000, 19000] },
    },
    'Nyeri County': {
        'Nyeri Town': { 'Single room': [3000, 5000], Bedsitter: [6000, 10000], 'One bedroom': [10000, 16000], 'Two bedroom': [16000, 26000] },
        Kamakwa: { 'Single room': [4000, 6500], Bedsitter: [7500, 12000], 'One bedroom': [13000, 20000], 'Two bedroom': [20000, 32000] },
        "King'ong'o": { 'Single room': [3500, 6000], Bedsitter: [7000, 11000], 'One bedroom': [12000, 18000], 'Two bedroom': [18000, 28000] },
        "Ruring'u": { 'Single room': [3000, 5000], Bedsitter: [6000, 9500], 'One bedroom': [10000, 15000], 'Two bedroom': [15000, 24000] },
        Kiganjo: { 'Single room': [2500, 4500], Bedsitter: [5000, 8000], 'One bedroom': [8500, 13000], 'Two bedroom': [13000, 21000] },
    },
    'Kakamega County': {
        'Kakamega Town': { 'Single room': [2500, 4500], Bedsitter: [5000, 8500], 'One bedroom': [9000, 14000], 'Two bedroom': [14000, 22000] },
        Milimani: { 'Single room': [4000, 6500], Bedsitter: [7500, 12000], 'One bedroom': [13000, 20000], 'Two bedroom': [20000, 32000] },
        Lurambi: { 'Single room': [3000, 5000], Bedsitter: [6000, 10000], 'One bedroom': [11000, 17000], 'Two bedroom': [17000, 26000] },
        Shieywe: { 'Single room': [2500, 4000], Bedsitter: [4500, 7500], 'One bedroom': [8000, 12000], 'Two bedroom': [12000, 19000] },
        Mahiakalo: { 'Single room': [2500, 4000], Bedsitter: [4500, 7500], 'One bedroom': [8000, 12000], 'Two bedroom': [12000, 19000] },
    },
}

function formatRentRange([minimum, maximum]) {
    return `KSh ${minimum.toLocaleString()} - ${maximum.toLocaleString()}`
}

export function getMarketRecommendations(county, budget, houseTypes, locations) {
    const countyProfiles = marketProfiles[county] || {}

    return locations.flatMap((location) => {
        const locationProfiles = countyProfiles[location] || {}
        const options = houseTypes
            .filter((houseType) => locationProfiles[houseType])
            .map((houseType) => {
                const rentRange = locationProfiles[houseType]
                const fitsBudget = budget >= rentRange[0] * 0.9 && budget <= rentRange[1] * 1.1

                return { location, houseType, rentRange, fitsBudget }
            })
        const visibleOptions = options.filter((option) => option.fitsBudget)
        const optionsToShow = visibleOptions.length > 0
            ? visibleOptions
            : options.sort((first, second) => Math.abs(((first.rentRange[0] + first.rentRange[1]) / 2) - budget) - Math.abs(((second.rentRange[0] + second.rentRange[1]) / 2) - budget)).slice(0, 1)

        return optionsToShow.map(({ location: optionLocation, houseType, rentRange, fitsBudget }) => ({
            location: optionLocation,
            houseType,
            averageRentRange: formatRentRange(rentRange),
            fitsBudget,
            note: fitsBudget
                ? `This is typically within about 10% of your KSh ${budget.toLocaleString()} budget in ${optionLocation}.`
                : `The closest common option here is ${houseType} at around ${formatRentRange(rentRange)}.`
        }))
    })
}