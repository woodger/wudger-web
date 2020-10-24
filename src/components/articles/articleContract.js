const shema = {
  title: {
    description: 'Наименование'
  },
  price: {
    type: 'number',
    description: 'Цена',
    unit: '₽'
  },
  madeYear: {
    type: 'number',
    description: 'Создан',
    unit: 'год'
  },
  activityType: {
    description: 'Тип деятельности'
  },
  descripotion: {
    description: 'Описание'
  },
  totalPages: {
    type: 'number',
    description: 'Объем',
    unit: 'стр.'
  },
  hidePages: {
    description: 'Скрыть страницы'
  },
  note: {
    description: 'Комментарий'
  }
};

export { shema };
