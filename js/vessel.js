/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.load = 0;
    this.position = null;
    this.planet = null;
    this.flyTo(position);
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    var loadString = 'Занято: ' + this.load + ' из ' + this.capacity + 'т.';
    var placeString = 'Местоположение: ' + this.positionString();
    write(this.toString() + ". " + placeString + ". " + loadString);
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    write(""+this.freeSpace())
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    write(""+this.load);
}

/**
 * Переносит корабль в указанную точку пространства или на планету.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 */
Vessel.prototype.flyTo = function (newPosition) {
    //Если это планета, то садимся на нее
    if(newPosition instanceof Planet)
        this.landToPlanet(newPosition)

    //Если пришли координаты, то летим туда
    else if(newPosition.length == 2)
        this.flyToPoint(newPosition)

    //Если ни то, ни другое, значит что-то пошло не так
    else throw new Error('Не могу переместиться: неправильно задан пункт назначения')
}

/**
 * Сажает корабль на поверхность указанной планеты.
 * @param Planet planet Планета, на которую мы хотим сесть.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.landToPlanet(earth);
 */
Vessel.prototype.landToPlanet = function (planet) {
    this.planet = planet;
    this.position = planet.position;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPoint Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 */
Vessel.prototype.flyToPoint = function (newPoint) {
    this.planet = null;
    this.position = newPoint;
}

/**
 * Свободное место на корабле в тоннах
 * @returns {number}
 */
Vessel.prototype.freeSpace = function () {
   return this.capacity - this.load;
}

/**
 * Строковое представление корабля
 * @returns {string}
 */
Vessel.prototype.toString = function()
{
    return 'Корабль "' + this.name + '"';
}

/**
 * Выводит положение корабля. Если он на планете, то название планеты. Если в космосе, то координаты
 * @returns {string}
 */
Vessel.prototype.positionString = function()
{
    return this.planet ? this.planet : this.position;
}

