<?php
/**
 * キャンペーンヒーローブロックのフロント出力
 */
if ( ! isset( $block ) || ! $block instanceof WP_Block ) {
	return;
}

$attrs = $block->attributes ? $block->attributes : array();

$image_pc_url   = isset( $attrs['imagePcUrl'] ) ? $attrs['imagePcUrl'] : '';
$image_pc_alt   = isset( $attrs['imagePcAlt'] ) ? $attrs['imagePcAlt'] : '';
$image_sp_url   = isset( $attrs['imageSpUrl'] ) ? $attrs['imageSpUrl'] : '';
$image_sp_alt   = isset( $attrs['imageSpAlt'] ) ? $attrs['imageSpAlt'] : '';
$hero_bg_img    = isset( $attrs['heroBackgroundImage'] ) ? $attrs['heroBackgroundImage'] : '';
$hero_bg_color  = isset( $attrs['heroBackgroundColor'] ) ? $attrs['heroBackgroundColor'] : '#ffcf31';
$hero_bg_repeat   = isset( $attrs['heroBackgroundRepeat'] ) ? $attrs['heroBackgroundRepeat'] : 'no-repeat';
$hero_bg_position   = isset( $attrs['heroBackgroundPosition'] ) ? $attrs['heroBackgroundPosition'] : 'center top';
$hero_bg_position_y = isset( $attrs['heroBackgroundPositionY'] ) ? trim( $attrs['heroBackgroundPositionY'] ) : '';
$hero_bg_size      = isset( $attrs['heroBackgroundSize'] ) ? $attrs['heroBackgroundSize'] : 'auto 82%';
$schedule_visible = isset( $attrs['scheduleVisible'] ) ? $attrs['scheduleVisible'] : true;
$schedule_bg_color = isset( $attrs['scheduleBackgroundColor'] ) ? $attrs['scheduleBackgroundColor'] : '#ffcf31';
$schedule_always_on = isset( $attrs['scheduleAlwaysOn'] ) ? $attrs['scheduleAlwaysOn'] : false;
$schedule_start = isset( $attrs['scheduleStartDate'] ) ? $attrs['scheduleStartDate'] : '';
$schedule_end  = isset( $attrs['scheduleEndDate'] ) ? $attrs['scheduleEndDate'] : '';
$schedule_note_visible = isset( $attrs['scheduleNoteVisible'] ) ? $attrs['scheduleNoteVisible'] : true;
$schedule_font_size   = isset( $attrs['scheduleFontSize'] ) ? $attrs['scheduleFontSize'] : '14px';
$schedule_text_color   = isset( $attrs['scheduleTextColor'] ) ? $attrs['scheduleTextColor'] : '#333';
$schedule_text_offset_y = isset( $attrs['scheduleTextOffsetY'] ) ? trim( (string) $attrs['scheduleTextOffsetY'] ) : '';
$schedule_note_offset_y = isset( $attrs['scheduleNoteOffsetY'] ) ? trim( (string) $attrs['scheduleNoteOffsetY'] ) : '';

$hero_style = 'background-color: ' . esc_attr( $hero_bg_color );
if ( $hero_bg_img !== '' ) {
	$bg_position = $hero_bg_position;
	if ( $hero_bg_position_y !== '' && preg_match( '/^-?\d+$/', $hero_bg_position_y ) ) {
		$bg_position .= ' ' . $hero_bg_position_y . 'px';
	}
	$hero_style .= '; background-image: url(' . esc_url( $hero_bg_img ) . '); background-repeat: ' . esc_attr( $hero_bg_repeat ) . '; background-position: ' . esc_attr( $bg_position ) . '; background-size: ' . esc_attr( $hero_bg_size );
}

$schedule_style = 'background-color: ' . esc_attr( $schedule_bg_color );
if ( $schedule_font_size !== '' ) {
	$schedule_style .= '; font-size: ' . esc_attr( $schedule_font_size );
}
if ( $schedule_text_color !== '' ) {
	$schedule_style .= '; color: ' . esc_attr( $schedule_text_color );
}
if ( $schedule_text_offset_y !== '' && preg_match( '/^-?\d+$/', $schedule_text_offset_y ) ) {
	$schedule_style .= '; --schedule-text-offset-y: ' . (int) $schedule_text_offset_y . 'px';
}
if ( $schedule_note_offset_y !== '' && preg_match( '/^-?\d+$/', $schedule_note_offset_y ) ) {
	$schedule_style .= '; --schedule-note-offset-y: ' . (int) $schedule_note_offset_y . 'px';
}

if ( $image_pc_alt === '' && $image_pc_url !== '' ) {
	$image_pc_alt = 'キャンペーン';
}
if ( $image_sp_alt === '' && $image_sp_url !== '' ) {
	$image_sp_alt = $image_pc_alt !== '' ? $image_pc_alt : 'キャンペーン';
}
?>
<section class="s-campaign-hero" style="<?php echo $hero_style; ?>">
  <div class="l-inner l-inner--sp-full">
    <figure class="campaign-hero__image">
      <img
        src="<?php echo esc_url( $image_pc_url ); ?>"
        class="is-hidden--sp"
        alt="<?php echo esc_attr( $image_pc_alt ); ?>"
      />
      <img
        src="<?php echo esc_url( $image_sp_url ); ?>"
        class="is-hidden--pc"
        alt="<?php echo esc_attr( $image_sp_alt ); ?>"
      />
    </figure>
    <?php if ( $schedule_visible ) : ?>
    <div class="campaign-hero__schedule" style="<?php echo esc_attr( $schedule_style ); ?>">
      <?php if ( $schedule_always_on ) : ?>
        <p><?php esc_html_e( '常時開催', 'rakutenmusic-theme' ); ?></p>
      <?php else : ?>
        <p><?php echo esc_html( $schedule_start . ( $schedule_end !== '' ? ' ～ ' . $schedule_end : '' ) ); ?></p>
      <?php endif; ?>
      <?php if ( $schedule_note_visible ) : ?>
        <p class="campaign-hero__schedule__note">
          <?php esc_html_e( '※進呈するポイント(期間限定含む)には上限や条件があります。', 'rakutenmusic-theme' ); ?>
          <a href="#cpn-detail" class="scroll"><?php esc_html_e( '詳細はこちら', 'rakutenmusic-theme' ); ?></a>
        </p>
      <?php endif; ?>
    </div>
    <?php endif; ?>
  </div>
</section>
