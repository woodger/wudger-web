const shema = {
  title: {
    descriotion: 'Наименование'
  },
  price: {
    type: 'number',
    descriotion: 'Цена',
    unit: '₽'
  },
  madeYear: {
    type: 'number',
    descriotion: 'Создан',
    unit: 'год'
  },
  activityType: {
    descriotion: 'Тип деятельности'
  },
  descriotion: {
    descriotion: 'Описание'
  },
  totalPages: {
    type: 'number',
    descriotion: 'Объем',
    unit: 'стр.'
  },
  hidePages: {
    descriotion: 'Скрыть страницы'
  },
  note: {
    descriotion: 'Комментарий'
  }
};

export { shema };
