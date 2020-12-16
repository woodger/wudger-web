<script>
  import Svg from './Svg.svelte';

  export let src;
  export let width = 16;
  export let height = 16;

  let img;

  $: if (src) {
    img = getSource(src);
  }

  function getSource(src) {
    const index = src.lastIndexOf('.');
    const ext = src.substr(index);

    if (['.doc', '.docx'].includes(ext)) {
      return {
        src: 'icons/file-word.svg',
        alt: 'word'
      };
    }

    if (['.xls', '.xlsx'].includes(ext)) {
      return {
        src: 'icons/file-excel.svg',
        alt: 'excel'
      };
    }

    if (['.ppt', '.pptx'].includes(ext)) {
      return {
        src: 'icons/file-powerpoint.svg',
        alt: 'powerpoint'
      };
    }

    if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
      return {
        src: 'icons/file-picture.svg',
        alt: 'picture'
      };
    }

    if (['.js', '.java', '.py', '.php'].includes(ext)) {
      return {
        src: 'icons/file-script.svg',
        alt: 'script'
      };
    }

    if (['.css', '.json'].includes(ext)) {
      return {
        src: 'icons/file-style.svg',
        alt: 'style'
      };
    }

    if (['.zip', '.rar'].includes(ext)) {
      return {
        src: 'icons/file-zip.svg',
        alt: 'arhive'
      };
    }

    if (ext === '.pdf') {
      return {
        src: 'icons/file-pdf.svg',
        alt: 'pdf'
      };
    }

    if (ext === '.txt') {
      return {
        src: 'icons/file-text.svg',
        alt: 'text'
      };
    }

    return {
      src: 'icons/file-empty.svg',
      alt: 'empty'
    };
  }
</script>

{#if img}
  <Svg {width} {height} src={img.src} alt={img.alt} />
{/if}
