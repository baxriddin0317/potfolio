import { useState } from 'react';

// components
import Seo from '../../components/Seo';

// icons
import { BsArrowRight } from 'react-icons/bs';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

// data
import { site } from '../../data/site';

const initialForm = { name: '', email: '', subject: '', message: '', website: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className='h-full bg-primary/30'>
      <Seo title='Contact' />
      <div className='container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* text */}
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-4'
          >
            Let&apos;s build something <span className='text-accent'>great.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='text-center max-w-[520px] mx-auto mb-10'
          >
            Have an idea, a design or a product to improve? Tell me about it — I usually reply within a few hours.
          </motion.p>
          {/* form */}
          <motion.form
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            onSubmit={handleSubmit}
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
          >
            {/* honeypot (hidden from humans) */}
            <input
              type='text'
              name='website'
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete='off'
              className='hidden'
              aria-hidden='true'
            />
            {/* input group */}
            <div className='flex gap-x-6 w-full'>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Your name'
                aria-label='Name'
                required
                className='input'
              />
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='Your email'
                aria-label='Email'
                required
                className='input'
              />
            </div>
            <input
              type='text'
              name='subject'
              value={form.subject}
              onChange={handleChange}
              placeholder='What are we building?'
              aria-label='Subject'
              className='input'
            />
            <textarea
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Tell me about your project, goals and timeline…'
              aria-label='Message'
              required
              className='textarea'
            ></textarea>
            <div className='flex flex-col xl:flex-row items-center gap-4'>
              <button
                type='submit'
                disabled={status === 'sending'}
                className='btn relative rounded-full border border-white/50 max-w-[170px] w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group disabled:opacity-50'
              >
                <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                  {status === 'sending' ? 'Sending…' : <>Let&apos;s talk</>}
                </span>
                <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
              </button>
              {status === 'success' && (
                <span className='text-sm text-green-400'>
                  Thank you! 🎉 Your message is on its way — I&apos;ll get back to you very soon.
                </span>
              )}
              {status === 'error' && (
                <span className='text-sm text-accent'>
                  Oops, something went wrong. Please message me on{' '}
                  <a href={site.links.telegram} target='_blank' rel='noopener noreferrer' className='underline'>
                    Telegram
                  </a>
                  .
                </span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
