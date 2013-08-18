/**
 * Вывод заголовка на страницу и в консоль
 * @param string Текст заголовка
 */
writeHeader = function(string)
{
    $("#log").append('<h1>'+string+'</h1>');
    console.log('----------------------');
    console.log(string);
};

/**
 * Вывод комментария на страницу и в консоль
 * @param string Текст комментария
 */
writeComment = function(string)
{
    $("#log").append('<div class="comment">'+string+'</div>');
    console.log(string)
};

/**
 * Вывод лога работы на страницу и в консоль
 * @param string Текст для отображения
 */
write = function(string)
{
    $("#log").append('<div class="output">'+string+'</div>');
    console.log(string)
};

/**
 * Вывод сообщения об ошибке на страницу и в консоль
 * @param string Текст сообщения об ошибке
 */
writeError = function(string)
{
    $("#log").append('<div class="error">'+string+'</div>');
    console.log(string)
};

/**
 * В этом классе будут лежать тестовые сценарии
 * @type {{}}
 */
var PlanetExpress = {};

PlanetExpress.test1 = function()
{
    writeHeader("Тестовый сценарий #1");
    writeComment("Создаем корабль и две планеты");

    var vessel = new Vessel('Яндекс', [0,0], 1000);
    var planetA = new Planet('A', [0,0], 0);
    var planetB = new Planet('B', [100, 100], 5000);

    // Проверка текущего состояния
    vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
    planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
    planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

    writeComment("Летим на планету B и берем там 1000т груза");

    vessel.flyTo(planetB);
    planetB.loadCargoTo(vessel, 1000);
    vessel.report(); // Корабль "Яндекс". Местоположение: 100,100. Занято: 1000 из 1000т.

    writeComment("Летим на планету А и выгружаем половину")

    vessel.flyTo(planetA);
    planetA.unloadCargoFrom(vessel, 500);
    vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 500 из 1000т.
    planetA.report(); // Планета "A". Местоположение: 0,0. Доступно груза: 500т.
    planetB.report(); // Планета "B". Местоположение: 100,100. Доступно груза: 4000т.
}

PlanetExpress.test2 = function()
{
    writeHeader("Тестовый сценарий #2");
    writeComment("Создаем корабль и две планеты");

    var vessel = new Vessel('Яндекс', [0,0], 1000);
    var planetA = new Planet('A', [0,0], 0);
    var planetB = new Planet('B', [100, 100], 5000);

    // Проверка текущего состояния
    vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
    planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
    planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

    writeComment("Летим на планету B и пытаемся взять там 2000т груза");

    vessel.flyTo(planetB);

    try
    {
        planetB.loadCargoTo(vessel, 2000)
    }
    catch (e)
    {
        writeError(e.message)
    };

    writeComment("Пробуем взять груз с планеты А");

    try
    {
        planetA.loadCargoTo(vessel, 1000)
    }
    catch (e)
    {
        writeError(e.message)
    };
}

PlanetExpress.test3 = function()
{
    writeHeader("Тестовый сценарий #3");
    writeComment("Создаемся сразу на планете А");

    var planetA = new Planet('A', [0,0], 0);
    var planetB = new Planet('B', [100, 100], 5000);
    var vessel = new Vessel('Яндекс', planetA, 1000);

    // Проверка текущего состояния
    vessel.report(); // Корабль "Яндекс". Местоположение: 0,0. Занято: 0 из 1000т.
    planetA.report(); // Планета "A". Местоположене: 0,0. Грузов нет.
    planetB.report(); // Планета "B". Местоположене: 100,100. Доступно груза: 5000т.

    writeComment("Летим в странное место");
    try
    {
        vessel.flyTo(12345);
    }
    catch (e)
    {
        writeError(e.message)
    };

    writeComment("Пробуем взять больше груза, чем есть на планете");

    try
    {
        planetA.loadCargoTo(vessel, 1000)
    }
    catch (e)
    {
        writeError(e.message)
    }
}