const assetTypeMakes = [
    {
        id: 1,
        name: "unknown",
    },
    {
        id: 4,
        name: "mg",
    },
    {
        id: 7,
        name: "seat",
    },
    {
        id: 10,
        name: "abarth",
    },
    {
        id: 60,
        name: "alfa romeo",
    },
    {
        id: 111,
        name: "audi",
    },
    {
        id: 113,
        name: "austin",
    },
    {
        id: 170,
        name: "bentley",
    },
    {
        id: 199,
        name: "bmw",
    },
    {
        id: 292,
        name: "chevrolet",
    },
    {
        id: 295,
        name: "chrysler",
    },
    {
        id: 297,
        name: "citroen",
    },
    {
        id: 321,
        name: "dacia",
    },
    {
        id: 325,
        name: "daihatsu",
    },
    {
        id: 362,
        name: "dodge",
    },
    {
        id: 381,
        name: "ds",
    },
    {
        id: 482,
        name: "ferrari",
    },
    {
        id: 485,
        name: "fiat",
    },
    {
        id: 503,
        name: "ford",
    },
    {
        id: 567,
        name: "great wall",
    },
    {
        id: 647,
        name: "honda",
    },
    {
        id: 674,
        name: "hyundai",
    },
    {
        id: 686,
        name: "infiniti",
    },
    {
        id: 707,
        name: "jaguar",
    },
    {
        id: 717,
        name: "jeep",
    },
    {
        id: 763,
        name: "kia",
    },
    {
        id: 813,
        name: "lamborghini",
    },
    {
        id: 815,
        name: "land rover",
    },
    {
        id: 830,
        name: "lexus",
    },
    {
        id: 864,
        name: "lotus",
    },
    {
        id: 897,
        name: "maserati",
    },
    {
        id: 909,
        name: "mazda",
    },
    {
        id: 926,
        name: "mercedes-benz",
    },
    {
        id: 942,
        name: "mini",
    },
    {
        id: 944,
        name: "mitsubishi",
    },
    {
        id: 1003,
        name: "nissan",
    },
    {
        id: 1034,
        name: "opel",
    },
    {
        id: 1070,
        name: "perodua",
    },
    {
        id: 1074,
        name: "peugeot",
    },
    {
        id: 1089,
        name: "porsche",
    },
    {
        id: 1135,
        name: "renault",
    },
    {
        id: 1158,
        name: "rollsroyce",
    },
    {
        id: 1166,
        name: "rover",
    },
    {
        id: 1173,
        name: "saab",
    },
    {
        id: 1187,
        name: "samsung",
    },
    {
        id: 1246,
        name: "skoda",
    },
    {
        id: 1248,
        name: "smart",
    },
    {
        id: 1269,
        name: "ssangyong",
    },
    {
        id: 1289,
        name: "subaru",
    },
    {
        id: 1298,
        name: "suzuki",
    },
    {
        id: 1334,
        name: "tesla",
    },
    {
        id: 1359,
        name: "toyota",
    },
    {
        id: 1402,
        name: "vauxhall",
    },
    {
        id: 1423,
        name: "volkswagen",
    },
    {
        id: 1424,
        name: "volvo",
    },
    {
        id: 1502,
        name: "gianni ferrari",
    },
    {
        id: 1556,
        name: "buick",
    },
    {
        id: 1557,
        name: "gmc",
    },
    {
        id: 1558,
        name: "lincoln",
    },
    {
        id: 1559,
        name: "karma",
    },
    {
        id: 1560,
        name: "lucid",
    },
    {
        id: 1561,
        name: "rivian",
    },
    {
        id: 1570,
        name: "hummer",
    },
    {
        id: 1571,
        name: "fisker",
    },
];

const expectedMakes = [
    { id: 10, name: "abarth" },
    { id: 60, name: "alfa romeo" },
    { id: 111, name: "audi" },
    { id: 113, name: "austin" },
    { id: 170, name: "bentley" },
    { id: 199, name: "bmw" },
    { id: 1556, name: "buick" },
    { id: 292, name: "chevrolet" },
    { id: 295, name: "chrysler" },
    { id: 297, name: "citroen" },
    { id: 321, name: "dacia" },
    { id: 325, name: "daihatsu" },
    { id: 362, name: "dodge" },
    { id: 381, name: "ds" },
    { id: 482, name: "ferrari" },
    { id: 485, name: "fiat" },
    { id: 1571, name: "fisker" },
    { id: 503, name: "ford" },
    { id: 1502, name: "gianni ferrari" },
    { id: 1557, name: "gmc" },
    { id: 567, name: "great wall" },
    { id: 647, name: "honda" },
    { id: 1570, name: "hummer" },
    { id: 674, name: "hyundai" },
    { id: 686, name: "infiniti" },
    { id: 707, name: "jaguar" },
    { id: 717, name: "jeep" },
    { id: 1559, name: "karma" },
    { id: 763, name: "kia" },
    { id: 813, name: "lamborghini" },
    { id: 815, name: "land rover" },
    { id: 830, name: "lexus" },
    { id: 1558, name: "lincoln" },
    { id: 864, name: "lotus" },
    { id: 1560, name: "lucid" },
    { id: 897, name: "maserati" },
    { id: 909, name: "mazda" },
    { id: 926, name: "mercedes-benz" },
    { id: 4, name: "mg" },
    { id: 942, name: "mini" },
    { id: 944, name: "mitsubishi" },
    { id: 1003, name: "nissan" },
    { id: 1034, name: "opel" },
    { id: 1070, name: "perodua" },
    { id: 1074, name: "peugeot" },
    { id: 1089, name: "porsche" },
    { id: 1135, name: "renault" },
    { id: 1561, name: "rivian" },
    { id: 1158, name: "rollsroyce" },
    { id: 1166, name: "rover" },
    { id: 1173, name: "saab" },
    { id: 1187, name: "samsung" },
    { id: 7, name: "seat" },
    { id: 1246, name: "skoda" },
    { id: 1248, name: "smart" },
    { id: 1269, name: "ssangyong" },
    { id: 1289, name: "subaru" },
    { id: 1298, name: "suzuki" },
    { id: 1334, name: "tesla" },
    { id: 1359, name: "toyota" },
    { id: 1, name: "unknown" },
    { id: 1402, name: "vauxhall" },
    { id: 1423, name: "volkswagen" },
    { id: 1424, name: "volvo" },
];

export { assetTypeMakes, expectedMakes };
