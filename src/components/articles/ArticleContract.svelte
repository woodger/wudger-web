<script>
  import { store } from '@toolkit';

  export let props = {};
  export let update;

  let admin = false;

  const now = new Date();
  const year = now.getFullYear();

  $: update([
    {
      title: 'Цена',
      value: props.price > 0 ?
        props.price : 'Бесплатно',
      unit: props.price > 0 ?
        '₽' : undefined,
      def: 0
    },
    {
      title: 'Создан',
      value: props.madeYear,
      unit: 'год',
      def: year
    },
    {
      title: 'Тип деятельности',
      value: props.activityType,
      def: null
    },
    {
      title: 'Комментарий',
      value: props.note && admin ?
        props.note : null,
      def: null
    }
  ]);

  store['user.admin'].subscribe((value) => {
    admin = value;
  });
</script>

<slot />
