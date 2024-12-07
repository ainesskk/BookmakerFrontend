const countries = [
    { english: "RU", russian: "Россия" },
    { english: "US", russian: "Соединенные Штаты" },
    { english: "CN", russian: "Китай" },
    { english: "JP", russian: "Япония" },
    { english: "DE", russian: "Германия" },
    { english: "FR", russian: "Франция" },
    { english: "BR", russian: "Бразилия" },
    { english: "IN", russian: "Индия" },
    { english: "GB", russian: "Великобритания" },
    { english: "CA", russian: "Канада" },
    { english: "AU", russian: "Австралия" },
    { english: "IT", russian: "Италия" },
    { english: "ES", russian: "Испания" },
    { english: "MX", russian: "Мексика" },
    { english: "KR", russian: "Южная Корея" },
    { english: "TR", russian: "Турция" },
    { english: "NL", russian: "Нидерланды" },
    { english: "SA", russian: "Саудовская Аравия" },
    { english: "CH", russian: "Швейцария" },
    { english: "SE", russian: "Швеция" }
];

export function findEnglish(searchString){
    const country = countries.find((country) => {
        return country.russian === searchString;
    })
    return country.english;
}