/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo)
{
    this.name = name;
    this.position = position;
    this.load = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    var cargoString = this.load ? 'Доступно груза: ' + this.load : 'Грузов нет';
    write('Планета "' + this.name + '". Местоположение: ' + this.position + '. ' + cargoString + '.');
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    write(""+this.load);
}

/**
 * Загружает на корабль заданное количество груза.
 *
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    // Если корабль не на нашей планете, мы не можем его загрузить
    if (vessel.planet != this)
        throw new Error('Невозможно загрузить корабль: он не на нашей планете');

    // Если груз не поместится на корабль, тоже ошибка
    if (cargoWeight > vessel.freeSpace())
        throw new Error('Невозможно загрузить корабль: груз не помещается на корабле');

    // Если у нас нет столько груза, тоже ошибка
    if(this.load < cargoWeight)
        throw new Error('Невозможно загрузить корабль: на планете нет необходимого количества груза');

    // Если все хорошо, переносим груз на корабль
    this.load -= cargoWeight;
    vessel.load += cargoWeight;
}

/**
 * Выгружает с корабля заданное количество груза.
 *
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    // Если корабль не на нашей планете, мы не можем забрать с него груз
    if (vessel.planet != this)
        throw new Error('Невозможно разгрузить корабль: он не на нашей планете');

    // Если на корабле нет столько груза, тоже ошибка
    if(vessel.load < cargoWeight)
        throw new Error('Невозможно разгрузить корабль: на нем нет необходимого количества груза');

    // Если все хорошо, переносим груз с корабля к себе
    vessel.load -= cargoWeight;
    this.load += cargoWeight;
}

/**
 * Строковое представление планеты
 * @returns {string}
 */
Planet.prototype.toString = function()
{
    return this.name;
}

