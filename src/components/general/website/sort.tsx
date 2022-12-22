import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function Website({ website, index }: any) {
  return (
    <Draggable draggableId={website.id} index={index}>
      {(provided: any) => (
        <li
          className='px-3 py-2 border-2 rounded text-lg bg-white'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {website.content}
        </li>
      )}
    </Draggable>
  )
}

const WebsiteList = React.memo(function WebsiteList({ websites }: any) {
  return websites.map((website: any, index: number) => (
    <Website website={website} index={index} key={website.id} />
  ))
})

export function SortableWebsites({ data, onSubmitSort }: any) {
  const [state, setState] = useState({ websites: data })

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const websites = reorder(
      state.websites,
      result.source.index,
      result.destination.index
    )

    setState({ websites })

    onSubmitSort(websites)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list'>
        {(provided: any) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={'list-none space-y-2'}
          >
            <WebsiteList websites={state.websites} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
