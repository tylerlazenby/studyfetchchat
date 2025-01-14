# StudyFetch Open Assignment

## Project Overview

Per the assignment, this is the description of the project that was given in the document fount at [The Link Provided In The Job Description](https://tinyurl.com/SFSoftwareEng)

> Create an AI tutor that helps students understand PDF documents through an interactive split-screen interface. Users should be able to chat with the AI (via text or voice) about the document while the AI can highlight and annotate relevant parts of the PDF in real-time.

## Getting Started
<span style="color:red;">**Please read all instructions carefully before proceeding. Failure to do so will result in inability to run the project as some of the technology used in this project requires very strict setups.**</span>

### Cloning and Installation
In order to clone via SSH, you will need to have an SSH key set up in your GitHub account. If you do not have an SSH key set up, you can follow the instructions [here](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).
Once you have that set up, run the following command.
```bash
git clone git@github.com:tylerlazenby/studyfetchchat.git
```

If you prefer to clone via HTTPS, you can run the following command.
```bash
git clone https://github.com/tylerlazenby/studyfetchchat.git
```


To Install the project run  the following command at the root of the project.
```bash
npm install
```

You will also need to generate the Prisma client (must only be done once your dependencies are installed).
```bash
prisma generate
```


### Environment Variables
In order to run this project locally, you will need to import the environment variables to your local development environment as well as create one additional `.env` file. First import the environment variables then add the entry for the `MONGODB_URL` to your .env file.

#### Getting Existing Environment Variables From Vercel
We use Vercel CLI to pull the environment variables from Vercel. Run the following command at the project root.
```bash
vercel env pull
```

#### Linking the Project to Vercel
To link the project to Vercel, you can run the following command at the project root.
```bash
vercel link
```
You will be prompted to log in to your Vercel account and select the project you want to link to. **Ensure you have access to the team before you attempt this.**

#### Adding New Environment Variables
From time to time, you might need to add environment variables to the project. You can do this by running the following command at the project root.
```bash
vercel env add *name* *value*
```
> <sub>**Note:** Replace *`name`* with the name of the environment variable and *`value`* with the value of the environment variable. They also can be excluded in the initial command and you will be prompted to enter them.</sub>

#### Removing Environment Variables
If you need to remove an environment variable, you can do so by running the following command at the project root.
```bash
vercel env rm *name*
```
> <sub>**Note:** Replace *`name`* with the name of the environment variable you want to remove. You can also add or remove environment variables from the Vercel dashboard.</sub>

### Running the project locally
Run the following on your local environment to start the development server
```bash
npm run dev
```