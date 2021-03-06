/**
 * External dependencies
 */
const { isUndefined, pickBy, split } = window.lodash;

/**
 * WordPress dependencies
 */
const { Placeholder, Spinner } = wp.components;
const { withSelect } = wp.data;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import SpeakerInspectorControls from './inspector-controls';
import SpeakerBlockContent from './block-content';

const MAX_POSTS = 100;

class SpeakersEdit extends Component {
	render() {
		const { speakerPosts } = this.props;
		const hasPosts = Array.isArray( speakerPosts ) && speakerPosts.length;

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<SpeakerInspectorControls { ...this.props } />
					<Placeholder
						icon="megaphone"
						label={ __( 'Speakers' ) }
					>
						{ ! Array.isArray( speakerPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<SpeakerInspectorControls { ...this.props } />
				<SpeakerBlockContent { ...this.props } />
			</Fragment>
		);
	}
}

const speakersSelect = ( select, props ) => {
	const { show_all_posts, posts_per_page, sort } = props.attributes;
	const { getEntityRecords } = select( 'core' );
	const [ orderby, order ] = split( sort, '_', 2 );

	const speakersQuery = pickBy( {
		orderby: orderby,
		order: order,
		per_page: show_all_posts ? MAX_POSTS : posts_per_page, // -1 is not allowed for per_page.
		_embed: true
	}, ( value ) => ! isUndefined( value ) );

	return {
		speakerPosts: getEntityRecords( 'postType', 'wcb_speaker', speakersQuery ),
	};
};

export const edit = withSelect( speakersSelect )( SpeakersEdit );
