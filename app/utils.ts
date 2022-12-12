export class Utils {
  public static decodeInterval(allow_interval) {
    var res = '';
    if (allow_interval != null && allow_interval.length > 0) {
      allow_interval.split('|').forEach(element => {
        let interval_item = element.split('#');

        switch (interval_item[0]) {
          case '1':
            res += 'Понедельник' + ' ' + interval_item[1] + '\n';
            break;
          case '2':
            res += 'Вторник' + ' ' + interval_item[1] + '\n';
            break;
          case '3':
            res += 'Среда' + ' ' + interval_item[1] + '\n';
            break;
          case '4':
            res += 'Четверг' + ' ' + interval_item[1] + '\n';
            break;
          case '5':
            res += 'Пятница' + ' ' + interval_item[1] + '\n';
            break;
          case '6':
            res += 'Суббота' + ' ' + interval_item[1] + '\n';
            break;
          case '7':
            res += 'Воскресенье' + ' ' + interval_item[1] + '\n';
            break;
        }
      });
    }
    //console.log(res);
    return res;
  }
}