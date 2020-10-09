<script>
  import store from '@store';

  export let props = {};
  export let update;

  let admin = false;
  let options = [];

  $: update([
    {
      name: 'Цена',
      value: props.price > 0 ?
        props.price : 'Бесплатно',
      unit: props.price > 0 ?
        '₽' : undefined
    },
    {
      name: 'Создан',
      value: props.madeYear,
      unit: 'год'
    },
    {
      name: 'Тип деятельности',
      value: props.activityType
    },
    {
      name: 'Комментарий',
      value: props.note && admin ?
        props.note : undefined
    }
  ]);

  store['oauth.user.admin'].subscribe((value) => {
    admin = value;
  });
</script>
