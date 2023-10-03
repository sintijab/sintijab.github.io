<!--src/components/Image.svelte-->
<script>
  export let title = '';
  export let url = '';
  export let alt = '';
  export let media_type = 'image';
  export let fullWidth = false;
  export let width = "";
  export let height = "";
  export let rounded = false;
</script>

  {#if media_type === 'image' && !rounded}
    <img loading="lazy" class={`media ${fullWidth ? 'img-fullWidth' : ''}`} src={url} alt={alt} width={width} height={height} />
  {:else if rounded}
    <img loading="lazy" class="clip-rounded" width={width} height={height} src={url} alt={alt} />
  {:else}
    <!--for videos and other media, embed with an iframe-->
    <iframe class="media" title={title} width="500" height="300" src={url}></iframe>
  {/if}
<style>
  .media {
    max-width: 100%;
    height: auto;
    aspect-ratio: 2 / 5;
    object-fit: cover;
    border-radius: inherit;
    border: none;
    position: absolute;
  }
  @media (min-width: 600px) {
    .media {
      aspect-ratio: 5 / 5;
    }
  }
  @media (min-width: 1080px) {
    .media {
      aspect-ratio: 9 / 5;
    }
  }

  .img-fullWidth {
    vertical-align: middle;
    border: none;
    bottom: 0;
    box-shadow: none;
    height: 100%;
    left: 0;
    margin: 0;
    max-height: none;
    max-width: none;
    object-fit: cover;
    outline: none;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    object-position: 0 100%;
  }

  .clip-rounded {
    object-fit: cover;
    border-radius: 50%;
  }
</style>