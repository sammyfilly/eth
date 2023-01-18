import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'
import { Analytics } from 'data/types'

import { learnColumn, Wrapper } from './Learn.model'
import { LearnColumnType } from './Learn.types'
import LearnColumn from './LearnColumn'

const Learn = () => {
  const dispatch = useDispatch()
  const isActiveRewardsEnabled = useSelector(
    (state: RootState) =>
      selectors.core.walletOptions.getActiveRewardsEnabled(state).getOrElse(false) as boolean
  )
  const handleActiveRewards = () => {
    dispatch(
      actions.analytics.trackEvent({
        key: Analytics.WALLET_ACTIVE_REWARDS_LEARNING_PAGE_CLICKED,
        properties: {}
      })
    )
  }

  return (
    <Wrapper>
      {learnColumn({ handleActiveRewards }).map(
        (
          { description, handleClick, icon, id, isActiveRewards, link, title }: LearnColumnType,
          i: number
        ) => {
          if (!isActiveRewardsEnabled && isActiveRewards) return null
          return (
            <LearnColumn
              description={description}
              handleClick={handleClick}
              icon={icon}
              isActiveRewards={isActiveRewards}
              key={id}
              link={link}
              showDivider={i !== 0}
              title={title}
            />
          )
        }
      )}
    </Wrapper>
  )
}

export default Learn
