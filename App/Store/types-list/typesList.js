const paymentMethods = [
    {
        id: 1,
        label: "Pay by card"
    },
    {
        id: 2,
        label: "Insurance"
    },
    {
        id: 3,
        label: "Free"
    }
];

const assignmentTypes = [
    {
        id: 1,
        name: "Assessment"
    },
    { id: 2, name: "Treatment" }
];

const impairmentTypes = [
    {
        id: 1,
        name: "Speech"
    },
    { id: 2, name: "Language" }
];

const assessmentType = [
    {
        id: 1,
        name: "Initial analysis"
    },
    { id: 2, name: "Treatment validation" },
    { id: 3, name: "Manual" }
];

const treatmentType = [{ id: 1, name: "New treatment" }];

const reportSources = [
    {
        id: 1,
        label: "New"
    },
    {
        id: 2,
        label: "From template"
    }
];

const appointmentType = [
    { id: 1, name: "Consultation" },
    { id: 2, name: "Assessment" },
    { id: 3, name: "Treatment" }
];

const words = [
    { id: 1, word: "Africa", ipa: "/ˈæf.rɪ.kə/" },
    { id: 2, word: "Aroma", ipa: "/əˈroʊ.mə/" },
    { id: 3, word: "Arabica", ipa: "/əˈræb.ɪ.kə/" },
    { id: 4, word: "Banana", ipa: "/bəˈnæn.ə/" },
    { id: 5, word: "Cherry", ipa: "/ˈtʃɛr.i/" },
    { id: 6, word: "Date", ipa: "/deɪt/" },
    { id: 7, word: "Elderberry", ipa: "/ˈɛl.dər.bɛr.i/" },
    { id: 8, word: "Fig", ipa: "/fɪɡ/" },
    { id: 9, word: "Grapefruit", ipa: "/ˈɡreɪp.fruːt/" },
    { id: 10, word: "Honeydew", ipa: "/ˈhʌn.i.djuː/" },
    { id: 11, word: "Jackfruit", ipa: "/ˈdʒæk.fruːt/" },
    { id: 12, word: "Kiwi", ipa: "/ˈkiːwi/" },
    { id: 13, word: "Lemon", ipa: "/ˈlɛm.ən/" },
    { id: 14, word: "Mango", ipa: "/ˈmæŋ.ɡoʊ/" },
    { id: 15, word: "Nectarine", ipa: "/ˈnɛk.tər.in/" },
    { id: 16, word: "Orange", ipa: "/ˈɔr.ɪndʒ/" },
    { id: 17, word: "Papaya", ipa: "/pəˈpaɪ.ə/" },
    { id: 18, word: "Quince", ipa: "/kwɪns/" },
    { id: 19, word: "Raspberry", ipa: "/ˈræz.bər.i/" },
    { id: 20, word: "Strawberry", ipa: "/ˈstrɔː.bɛr.i/" },
    { id: 21, word: "Tangerine", ipa: "/ˈtæn.dʒər.in/" },
    { id: 22, word: "Ugli fruit", ipa: "/ˈʌɡ.li fruːt/" },
    { id: 23, word: "Watermelon", ipa: "/ˈwɔː.tərˌmɛl.ən/" }
];

export default {
    paymentMethods,
    assignmentTypes,
    impairmentTypes,
    assessmentType,
    treatmentType,
    reportSources,
    appointmentType,
    words
};
