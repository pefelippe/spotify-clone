import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import Modal from '../components/Modal';
import { PageHeader, GridLayout, Card } from '../components/shared';
import { playlists } from '../mock';

const Playlists = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePlaylist = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Minhas Playlists"
        subtitle="Sua coleção pessoal de playlists"
      >
        <CustomButton
          label="Criar Playlist"
          onClick={handleCreatePlaylist}
          variant="primary"
          customClassName="bg-green-spotify hover:bg-green-600"
        />
      </PageHeader>

      {/* Playlists Grid */}
      <GridLayout>
        {playlists.map((playlist) => (
          <Card key={playlist.id} hover>
            <img 
              src={playlist.imageUrl} 
              alt={playlist.name}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <h3 className="text-white-text font-semibold text-sm truncate">
              {playlist.name}
            </h3>
            <p className="text-gray-400 text-xs">
              {playlist.songs} músicas
            </p>
          </Card>
        ))}
      </GridLayout>

      {/* Create Playlist Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Criar Nova Playlist"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome da Playlist
            </label>
            <input
              type="text"
              placeholder="Digite o nome da playlist..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white-text placeholder-gray-400 focus:outline-none focus:border-green-spotify"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição (opcional)
            </label>
            <textarea
              placeholder="Descreva sua playlist..."
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white-text placeholder-gray-400 focus:outline-none focus:border-green-spotify resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <CustomButton
              label="Cancelar"
              onClick={handleCloseModal}
              variant="outline"
              customClassName="flex-1"
            />
            <CustomButton
              label="Criar"
              onClick={() => {
                // TODO: Implement playlist creation
                handleCloseModal();
              }}
              variant="primary"
              customClassName="flex-1 bg-green-spotify hover:bg-green-600"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Playlists;
