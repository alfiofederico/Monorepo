import React from 'react'
import { useEntities } from 'core/entities/entitiesContext'
import styled from 'styled-components'
import { fontSize } from 'core/theme'
import Button from 'core/components/Button'
import { ToolExperienceBlock } from 'core/blocks/tools/ToolExperienceBlock'
import { usePageContext } from 'core/helpers/pageContext'
import get from 'lodash/get'
import ModalTrigger from 'core/components/ModalTrigger'
import BlockWrapper from 'core/blocks/block/BlockWrapper'

const ToolLabel = ({ id }) => {
    const { getEntity } = useEntities()

    const entity = getEntity(id)
    if (!entity) {
        return <span title="Missing entity">{id}</span>
    }

    const { name, homepage } = entity

    return (
        <ModalTrigger
            trigger={
                <span className="ToolLabel">
                    <LabelLink as="a" href={homepage.url}>
                        {name}
                    </LabelLink>
                </span>
            }
            label={name}
        >
            <ToolLabelModal id={id} />
        </ModalTrigger>
    )
}

const ToolLabelModal = ({ id, closeComponent }) => {
    const pageContext = usePageContext()
    const block = pageContext.blocks.find(block => block.id === id)
    // unhide variants
    const variants = block.variants.map(b => ({ ...b, hidden: false }))
    // const blockData = get(pageContext.pageData, block.variants[0].dataPath)
    return <BlockWrapper withMargin={false} block={{ ...block, variants }} pageData={pageContext.pageData} index={0} />

    // return <ToolExperienceBlock block={block} data={blockData} closeComponent={closeComponent}/>
}

const LabelLink = styled(Button)`
    padding: 4px 12px;
    border-radius: 500px;
    display: inline-block;
    font-size: ${fontSize('smaller')};
    white-space: nowrap;
`

export default ToolLabel
