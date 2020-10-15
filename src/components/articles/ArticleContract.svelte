<script>
  import store from '@store';

  export let props = {};
  export let update;

  let admin = false;

  $: update([
    {
      title: 'Цена',
      value: props.price > 0 ?
        props.price : 'Бесплатно',
      unit: props.price > 0 ?
        '₽' : undefined
    },
    {
      title: 'Создан',
      value: props.madeYear,
      unit: 'год'
    },
    {
      title: 'Тип деятельности',
      value: props.activityType
    },
    {
      title: 'Комментарий',
      value: props.note && admin ?
        props.note : undefined
    }
  ]);

  store['oauth.user.admin'].subscribe((value) => {
    admin = value;
  });
</script>
