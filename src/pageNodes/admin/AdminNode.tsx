'use client'

import {
  editSite,
  getSite,
  getSiteDescription,
  getSiteEnabledDownvotes,
  getSiteEnabledNSFW,
  getSiteLegal,
  getSiteName,
  getSiteSidebar,
} from '@/shared/libs/Lemmy/site'
import { getAuth } from '@/shared/libs/Users'
import {
  Button,
  Checkbox,
  Input,
  Spacer,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function AdminNode() {
  const [siteName, setSiteName] = useState<string>()
  const [siteDescription, setSiteDescription] = useState<string>()
  const [siteSidebar, setSiteSidebar] = useState<string>()
  const [siteLegal, setSiteLegal] = useState<string>()
  const [siteEnabledNSFW, setSiteEnabledNSFW] = useState<boolean>()
  const [siteEnabledDownvotes, setSiteEnabledDownvotes] = useState<boolean>()

  useEffect(() => {
    fetchAPI()

    // Fetching the site information and populating the input fields with it
    async function fetchAPI() {
      const site = await getSite()
      setSiteName(getSiteName(site))
      setSiteDescription(getSiteDescription(site))
      setSiteSidebar(getSiteSidebar(site))
      setSiteLegal(getSiteLegal(site))
      setSiteEnabledNSFW(getSiteEnabledNSFW(site))
      setSiteEnabledDownvotes(getSiteEnabledDownvotes(site))
    }
  }, [])

  return (
    <Tabs aria-label="Admin Settings" className="mt-3">
      {/* ------------------------------------------------ */}
      {/* Site Information - General settings for the site */}
      <Tab key="site" title="Site" className="flex flex-col gap-3">
        <Spacer />

        {/* Site Name - The display name of the site (not domain)*/}
        <Input
          type="text"
          label="Name"
          value={siteName}
          onValueChange={setSiteName}
        />

        {/* Site Short - A very short description of the site tp use in places that cant display the whole sidebar */}
        <Input
          type="text"
          label="Short Description"
          value={siteDescription}
          onValueChange={setSiteDescription}
        />

        {/* Site Description - A longer description of the site to display in the sidebar */}
        <Textarea
          type="text"
          label="Description"
          value={siteSidebar}
          onValueChange={setSiteSidebar}
        />

        {/* Site Legal - Legal information about the site to display*/}
        <Textarea
          type="text"
          label="Legal"
          value={siteLegal}
          onValueChange={setSiteLegal}
        />

        <Checkbox isSelected={siteEnabledDownvotes}>Enable Downvotes</Checkbox>
        <Checkbox isSelected={siteEnabledNSFW}>Enable NSFW</Checkbox>

        <Button
          type="submit"
          onClick={async () => {
            console.log(await getAuth())
            const response = await editSite({
              name: siteName,
              description: siteDescription,
              sidebar: siteSidebar,
            })
            console.log(response)
          }}
        >
          Save
        </Button>
      </Tab>

      {/* ------------------------------------------------ */}
      {/*  */}
      <Tab key="rate_limiting" title="Rate Limiting">
        <p>Hi</p>
      </Tab>

      {/* ------------------------------------------------ */}
      {/*  */}
      <Tab key="taglines" title="Taglines">
        <p>Hi</p>
      </Tab>

      {/* ------------------------------------------------ */}
      {/*  */}
      <Tab key="emojis" title="Emojis">
        <p>Hi</p>
      </Tab>

      {/* ------------------------------------------------ */}
      {/*  */}
      <Tab key="flairs" title="Flairs">
        <p>Hi</p>
      </Tab>

      {/* ------------------------------------------------ */}
      {/* Settings relating to customizing the navbar for the site */}
      <Tab key="navbar" title="Navbar">
        <p>Hi</p>
      </Tab>

      {/* ------------------------------------------------ */}
      {/*  */}
      <Tab key="federation" title="Federation">
        <p>Hi</p>
      </Tab>
      <Tab key="fediseer" title="Fediseer">
        <p>Hi</p>
      </Tab>
    </Tabs>
  )
}
