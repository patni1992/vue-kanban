<template>
  <div class="card">
    {{ card.name }}
  </div>
</template>

<script>
export default {
  props: { card: Object },
}
</script>

<style scoped lang="scss">
$card-border-radius: 3px;
$gap: 10px;
.card {
  cursor: pointer;
  word-wrap: break-word;
  background-color: $bg-color-dark;
  color: white;
  padding: $gap;
  &:not(:last-child) {
    margin-bottom: $gap;
  }

  border-radius: $card-border-radius;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  img {
    display: block;
    width: calc(100% + 2 * #{$gap});
    margin: -$gap 0 $gap (-$gap);
    border-top-left-radius: $card-border-radius;
    border-top-right-radius: $card-border-radius;
  }
}
</style>
